import { IncomingHttpHeaders } from 'http';

export interface ControllerRequest<B, P = undefined, Q = undefined, H = IncomingHttpHeaders> {
    body: B;
    params: P;
    query: Q;
    headers: H;
}
