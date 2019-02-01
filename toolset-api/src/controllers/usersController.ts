import IRequest from "../models/types/IRequest";
import IResponse from "../models/types/IResponse";
import LoginRequest from "../models/DTOs/loginRequest";
import LoginResponse from "../models/DTOs/loginResponse";
import RegistrationRequest from "../models/DTOs/registrationRequest";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUnitOfWork } from "../interfaces";
import { inject, injectable } from "inversify";

@injectable()
export default class UsersController {
    constructor(@inject('unitOfWork') private unitOfWork: IUnitOfWork) { }

    public login() {
        return async (req: IRequest<LoginRequest>): Promise<IResponse<LoginResponse>> => {
            if (!req.body.username || !req.body.password) {
                throw {
                    status: 400,
                    message: 'Invalid request body'
                };
            }

            const user = await this.unitOfWork.user.getUserByUsername(req.body.username);
            if (!user) {
                throw {
                    status: 400,
                    message: 'User doesn\'t exist'
                };
            }

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                throw {
                    status: 400,
                    message: 'Invalid login'
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
                status: 200
            };
        };
    }


    public registration() {
        return async (req: IRequest<RegistrationRequest>): Promise<IResponse<void | any>> => {
            if (!req.body.username || !req.body.password || !req.body.displayName) {
                return {
                    status: 400
                };
            }
            try {

                await this.unitOfWork.user.createUser({
                    ...req.body,
                    role: 'user',
                    password: bcrypt.hashSync(req.body.password)
                });
            } catch (error) {
                return {
                    status: 400
                };
            }

            return {
                status: 200
            };
        };
    }

    public profile() {
        return async (req: IRequest<RegistrationRequest>): Promise<IResponse<void | any>> => {

            return {
                status: 200
            }
        };
    }
}