export type ResponseBase<Status = number, Body = any> = {
    statusCode: Status;
    body?: Body;
};

type ResponseWithoutBody<Status> = Pick<ResponseBase<Status>, 'statusCode'>;
type ResponseWithBody<Status, Body> = Required<ResponseBase<Status, Body>>;

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

type TvShowListItem = {
    name: string;
    id: number;
    genres: string[];
    image: string;
};

type TvShowDetails = TvShowListItem & {
    summary: string;
    imdb: string;
    cast: CastListItem[];
};

type CastListItem = ActorListItem & {
    character: string;
};

type CommentListItem = {
    id: string;
    userDisplayName: string;
    message: string;
    postedAt: string;
};

type ActorListItem = {
    id: number;
    name: string;
    image: string;
};

type ActorDetails = ActorListItem & {
    dateOfBirth: string;
    country: string;
};

export type LoginResponse = ResponseWithBody<200, LoginResponseBody>;
export type ListTvShowsResponse = ResponseWithBody<200, TvShowListItem[]>;
export type GetTvShowResponse = ResponseWithBody<200, TvShowDetails>;
export type ListTvShowCommentsResponse = ResponseWithBody<200, CommentListItem[]>;
export type ListActorsResponse = ResponseWithBody<200, ActorListItem[]>;
export type GetActorResponse = ResponseWithBody<200, ActorDetails>;
export type ListActorCommentsResponse = ResponseWithBody<200, CommentListItem[]>;