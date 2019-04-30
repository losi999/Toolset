export type ResponseBase<N = number, T = any> = {
    statusCode: N;
    body?: T;
};

type ResponseWithoutBody<N> = Pick<ResponseBase<N>, 'statusCode'>;
type ResponseWithBody<N, T> = Required<ResponseBase<N, T>>;

type BadRequestResponseBody = {
    errorCode: string;
    data?: any;
};

export type BadRequestResponse = ResponseWithBody<400, BadRequestResponseBody>;
export type OkResponse = ResponseWithoutBody<200>;
export type UnauthorizedResponse = ResponseWithoutBody<401>;
export type ForbiddenResponse = ResponseWithoutBody<403>;
export type InternalServerErrorResponse = ResponseWithoutBody<500>;

type LoginResponseBody = {
    token: string;
};

export type LoginResponse = ResponseWithBody<200, LoginResponseBody>;
