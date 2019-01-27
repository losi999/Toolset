export default interface IResponse<T> {
    status: number;
    body?: T;
}
