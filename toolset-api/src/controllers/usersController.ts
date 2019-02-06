import LoginRequest from "../models/DTOs/loginRequest";
import RegistrationRequest from "../models/DTOs/registrationRequest";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUnitOfWork } from "../interfaces";
import { inject, injectable } from "inversify";
import { LoginResponse, OkResponse, BadRequestResponse } from '../models/types/controllerResponse';
import { Request } from 'express';


@injectable()
export default class UsersController {
    constructor(@inject('unitOfWork') private unitOfWork: IUnitOfWork) { }

    public login() {
        return async (req: Request): Promise<LoginResponse | BadRequestResponse> => {
            const body = req.body as LoginRequest;

            if (!body.username || !body.password) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'Invalid request body'
                    }
                };
            }

            const user = await this.unitOfWork.user.getUserByUsername(body.username);
            if (!user) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'User doesn\'t exist'
                    }
                };
            }

            if (!bcrypt.compareSync(body.password, user.password)) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'Invalid login'
                    }
                };
            }

            const claims = {
                username: user.username,
                displayName: user.displayName,
                role: user.role
            };
            const token = jwt.sign(claims, process.env.JWT_SECRET || '', {
                expiresIn: 60 * 60 * 24
            });

            return {
                body: {
                    token
                },
                statusCode: 200
            };
        };
    }


    public registration() {
        return async (req: Request): Promise<OkResponse | BadRequestResponse> => {
            const body = req.body as RegistrationRequest;

            if (!body.username || !body.password || !body.displayName) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'Invalid request body'
                    }
                };
            }
            try {

                await this.unitOfWork.user.createUser({
                    ...req.body,
                    role: 'user',
                    password: bcrypt.hashSync(body.password)
                });
            } catch (error) {
                return {
                    statusCode: 400,
                    body: {
                        error: 'Username already exists'
                    }
                };
            }

            return {
                statusCode: 200
            };
        };
    }

    public profile() {
        return async (req: Request): Promise<any> => {

            return {
                statusCode: 200
            }
        };
    }
}