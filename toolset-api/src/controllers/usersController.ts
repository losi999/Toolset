import bcrypt from 'bcryptjs';
import { Request } from 'express';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { UnitOfWork } from '@/interfaces';
import LoginRequest from '@/models/DTOs/loginRequest';
import LoginResponse from '@/models/DTOs/loginResponse';
import RegistrationRequest from '@/models/DTOs/registrationRequest';
import { BadRequestResponse, OkResponse } from '@/models/types/controllerResponses';
import { ControllerRequest } from '@/models/types/controllerRequest';

@injectable()
export default class UsersController {
    constructor(@inject('unitOfWork') private unitOfWork: UnitOfWork) { }

    public login(): (req: ControllerRequest<LoginRequest>) => Promise<LoginResponse | BadRequestResponse> {
        return async (req) => {
            if (!req.body.username || !req.body.password) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'Invalid request body',
                    },
                };
            }

            const user = await this.unitOfWork.user.getUserByUsername(req.body.username);
            if (!user) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'User doesn\'t exist',
                    },
                };
            }

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'Invalid login',
                    },
                };
            }

            const claims = {
                username: user.username,
                displayName: user.displayName,
                role: user.role,
            };
            const token = jwt.sign(claims, process.env.JWT_SECRET || '', {
                expiresIn: 60 * 60 * 24,
            });

            return {
                body: {
                    token,
                },
                statusCode: 200,
            };
        };
    }

    public registration(): (req: ControllerRequest<RegistrationRequest>) => Promise<OkResponse | BadRequestResponse> {
        return async (req) => {
            if (!req.body.username || !req.body.password || !req.body.displayName) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'Invalid request body',
                    },
                };
            }
            try {
                await this.unitOfWork.user.createUser({
                    ...req.body,
                    role: 'user',
                    password: bcrypt.hashSync(req.body.password),
                });
            } catch (error) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'Username already exists',
                    },
                };
            }

            return {
                statusCode: 200,
            };
        };
    }

    public profile(): (req: Request) => Promise<any> {
        return async (req) => {

            return {
                statusCode: 200,
            };
        };
    }
}
