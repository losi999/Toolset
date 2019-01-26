import { IRequest } from "../models/types/IRequest";
import { IResponse } from "../models/types/IResponse";
import { LoginRequest } from "../models/DTOs/loginRequest";
import { LoginResponse } from "../models/DTOs/loginResponse";
import { RegistreRequest } from "../models/DTOs/registerRequest";

export default class UsersController {
    public async login(req: IRequest<LoginRequest>): Promise<IResponse<LoginResponse>> {
        console.log(req.body);
        return {
            body: {
                token: 'some.jwt.token'
            },
            status: 200
        };
    }

    public async register(req: IRequest<RegistreRequest>): Promise<IResponse<void>> {
        console.log(req.body);
        return {
            status: 200
        };
    }
}