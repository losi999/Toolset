import { OkResponse } from '../types/controllerResponse';

interface LoginResponseBody {
    token: string;
}

export default interface LoginResponse extends OkResponse {
    body: LoginResponseBody;
}
