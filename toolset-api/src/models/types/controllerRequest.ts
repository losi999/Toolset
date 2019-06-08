import { IncomingHttpHeaders } from 'http';

export type ControllerRequest<B, P = undefined, Q = undefined, H = IncomingHttpHeaders> = {
    body: B;
    params: P;
    query: Q;
    headers: H;
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type RegistrationRequest = {
    username: string;
    password: string;
    displayName: string;
};
