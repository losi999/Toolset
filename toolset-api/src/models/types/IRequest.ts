export default interface IRequest<T> {
    body: T;
    params: any;
    query: any;
    headers: any;
}
