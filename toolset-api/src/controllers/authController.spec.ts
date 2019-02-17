import 'reflect-metadata';
import 'mocha';
import AuthController from './authController';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import { ControllerRequest } from '../models/types/controllerRequest';
import { expect } from 'chai';
import { UnauthorizedResponse, ForbiddenResponse } from '../models/types/controllerResponses';

describe('Auth controller', () => {
    let controller: AuthController;
    let stubJwtVerify: sinon.SinonStub;
    let request: ControllerRequest<undefined>;

    beforeEach(() => {
        controller = new AuthController();
        stubJwtVerify = sinon.stub(jwt, 'verify');
        request = {} as ControllerRequest<undefined>;
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return HTTP 401 if no token if provided', async () => {
        request.headers = {
            authorization: undefined,
        };
        const response = await controller.authorize('')(request) as UnauthorizedResponse;

        expect(response.statusCode).to.equal(401);
        expect(response.body.error).to.equal('Missing token');
    });

    it('should return HTTP 401 if an invalid token if provided', async () => {
        request.headers = {
            authorization: 'invalid.jwt.token',
        };
        stubJwtVerify.throws({});

        const response = await controller.authorize('')(request) as UnauthorizedResponse;

        expect(response.statusCode).to.equal(401);
        expect(response.body.error).to.equal('Invalid or expired token');
    });

    it('should return HTTP 403 if user is not among given roles', async () => {
        request.headers = {
            authorization: 'user.jwt.token',
        };
        stubJwtVerify.returns({
            role: 'user',
        });

        const response = await controller.authorize('admin')(request) as ForbiddenResponse;

        expect(response.statusCode).to.equal(403);
        expect(response.body.error).to.equal('Forbidden');
    });

    it('should return nothing if authorization is successful', async () => {
        request.headers = {
            authorization: 'user.jwt.token',
        };
        stubJwtVerify.returns({
            role: 'user',
        });

        const response = await controller.authorize('user')(request);

        expect(response).to.equal(undefined);
        });
});
