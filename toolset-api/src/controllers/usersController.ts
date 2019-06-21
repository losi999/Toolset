import { inject, injectable } from 'inversify';
import { UnitOfWork, TokenService, PasswordService, SchemaValidatorService } from '@/models/types/interfaces';
import { ControllerActionType, LoginBody, RegistrationBody } from '@/models/types/controllerRequest';
import loginSchema from '@/schemas/login.json';
import registrationSchema from '@/schemas/registration.json';
import { LoginResponse, BadRequestResponse, OkResponse } from '@/models/types/controllerResponses';
import { INJECTABLES } from '@/models/types/types';

@injectable()
export default class UsersController {
    constructor(
        @inject(INJECTABLES.unitOfWork) private unitOfWork: UnitOfWork,
        @inject(INJECTABLES.ajvSchemaValidatorService) private schemaValidator: SchemaValidatorService,
        @inject(INJECTABLES.tokenService) private tokenService: TokenService,
        @inject(INJECTABLES.passwordService) private passwordService: PasswordService,
    ) { }

    public login(): ControllerActionType<LoginResponse | BadRequestResponse, LoginBody> {
        return async (req) => {
            const validationError = this.schemaValidator.validate(loginSchema, req.body);

            if (validationError) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'LG001',
                        data: validationError,
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

    public registration(): ControllerActionType<OkResponse | BadRequestResponse, RegistrationBody> {
        return async (req) => {
            const validationError = this.schemaValidator.validate(registrationSchema, req.body);

            if (validationError) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'RG001',
                        data: validationError,
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
}
