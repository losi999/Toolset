import { IncomingHttpHeaders } from 'http';

type ControllerRequest<Body, Path, Query> = {
    body?: Body;
    params?: Path;
    query?: Query;
    headers?: IncomingHttpHeaders;
};

export type ControllerActionType<Return, Body, Path = undefined, Query = undefined> = (req: ControllerRequest<Body, Path, Query>) => Promise<Return>;

export type LoginBody = {
    username: string;
    password: string;
};

export type RegistrationBody = {
    username: string;
    password: string;
    displayName: string;
};

export type CommentBody = {
    message: string;
};
