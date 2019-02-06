export interface ControllerResponse {
    statusCode: number;
    body?: any;
}

export interface OkResponse extends ControllerResponse {
    statusCode: 200;
}

interface ErrorResponseBody {
    error: string;
}

export interface BadRequestResponse extends ControllerResponse {
    statusCode: 400;
    body: ErrorResponseBody;
}

export interface UnauthorizedResponse extends ControllerResponse {
    statusCode: 401;
    body: ErrorResponseBody;
}

export interface ForbiddenResponse extends ControllerResponse {
    statusCode: 403;
    body: ErrorResponseBody;
}

interface LoginResponseBody {
    token: string;
}

export interface LoginResponse extends OkResponse {
    body: LoginResponseBody;
}
