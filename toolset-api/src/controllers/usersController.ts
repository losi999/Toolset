import { inject, injectable } from 'inversify';
import { UnitOfWork, TokenService, PasswordService } from '@/models/types/interfaces';
import { ControllerRequest, LoginRequest, RegistrationRequest } from '@/models/types/controllerRequest';
import { Ajv } from 'ajv';
import loginSchema from '@/schemas/login.json';
import registrationSchema from '@/schemas/registration.json';
import { LoginResponse, BadRequestResponse, OkResponse } from '@/models/types/controllerResponses';
import { INJECTABLES } from '@/inversify.config';

@injectable()
export default class UsersController {
    constructor(
        @inject(INJECTABLES.unitOfWork) private unitOfWork: UnitOfWork,
        @inject(INJECTABLES.ajv) private validator: Ajv,
        @inject(INJECTABLES.tokenService) private tokenService: TokenService,
        @inject(INJECTABLES.passwordService) private passwordService: PasswordService,
    ) { }

    public login(): (req: ControllerRequest<LoginRequest>) => Promise<LoginResponse | BadRequestResponse> {
        return async (req) => {
            const validate = this.validator.compile(loginSchema);
            const valid = validate(req.body);

            if (!valid) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'LG001',
                        data: validate.errors,
                    },
                };
            }

            const user = await this.unitOfWork.user.getUserByUsername(req.body.username);
            if (!user) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'LG002',
                    },
                };
            }

            if (!this.passwordService.checkPassword(req.body.password, user.password)) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'LG002',
                    },
                };
            }

            const token = this.tokenService.generateToken({
                username: user.username,
                displayName: user.displayName,
                role: user.role,
            });

            return {
                statusCode: 200,
                body: {
                    token,
                },
            };
        };
    }

    public registration(): (req: ControllerRequest<RegistrationRequest>) => Promise<OkResponse | BadRequestResponse> {
        return async (req) => {
            const validate = this.validator.compile(registrationSchema);
            const valid = validate(req.body);

            if (!valid) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'RG001',
                    },
                };
            }
            try {
                await this.unitOfWork.user.createUser({
                    ...req.body,
                    role: 'user',
                    password: this.passwordService.encryptPassword(req.body.password),
                });
            } catch (error) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'RG002',
                    },
                };
            }

            return {
                statusCode: 200,
            };
        };
    }

    public profile(): (req: ControllerRequest<undefined>) => Promise<OkResponse> {
        return async (req) => {
            return {
                statusCode: 200,
            };
        };
    }
}
