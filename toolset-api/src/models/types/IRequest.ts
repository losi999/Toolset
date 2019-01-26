export interface IRequest<T> {
    body: T;
    params: any;
    query: any;
}
