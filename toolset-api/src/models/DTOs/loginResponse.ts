import { OkResponse } from '@/models/types/controllerResponses';

interface LoginResponseBody {
    token: string;
}

export default interface LoginResponse extends OkResponse {
    body: LoginResponseBody;
}
