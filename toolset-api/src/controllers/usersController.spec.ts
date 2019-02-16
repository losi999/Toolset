import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import UsersController from './usersController';
import { IUnitOfWork } from '../interfaces';
import LoginResponse from '../models/DTOs/loginResponse';
import { Request } from 'express';
import { ControllerRequest } from '../models/types/controllerRequest';
import LoginRequest from '../models/DTOs/loginRequest';
import RegistrationRequest from '../models/DTOs/registrationRequest';
import { BadRequestResponse } from '../models/types/controllerResponses';

describe('Users controller', () => {
    let controller: UsersController;
    let mockUnitOfWork: IUnitOfWork;
    let stubGetUserByUsername: sinon.SinonStub;
    let stubCreateUser: sinon.SinonStub;
    let stubBcryptComparySync: sinon.SinonStub;
    let stubJwtSign: sinon.SinonStub;

    beforeEach(() => {
        stubGetUserByUsername = sinon.stub();
        stubCreateUser = sinon.stub();
        stubBcryptComparySync = sinon.stub(bcrypt, 'compareSync');
        stubJwtSign = sinon.stub(jwt, 'sign');
        sinon.stub(bcrypt, 'hashSync');
        mockUnitOfWork = {
            user: {
                getUserByUsername: stubGetUserByUsername,
                createUser: stubCreateUser,
            },
        };
        controller = new UsersController(mockUnitOfWork);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Login action', () => {
        let request: ControllerRequest<LoginRequest>;

        beforeEach(() => {
            request = {} as ControllerRequest<LoginRequest>;
        });

        it('should return HTTP 400 if no username is provided', async () => {
            request.body = {
                username: '',
                password: 'password123',
            };
            const response = await controller.login()(request) as BadRequestResponse;

            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal('Invalid request body');
        });

        it('should return HTTP 400 if no password is provided', async () => {
            request.body = {
                username: 'user123',
                password: '',
            };
            const response = await controller.login()(request) as BadRequestResponse;

            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal('Invalid request body');
        });

        it('should return HTTP 400 if username not found', async () => {
            stubGetUserByUsername.resolves(undefined);
            request.body = {
                username: 'nonExistingUser',
                password: 'password123',
            };
            const response = await controller.login()(request) as BadRequestResponse;

            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal('User doesn\'t exist');
        });

        it('should return HTTP 400 if password is incorrect', async () => {
            stubGetUserByUsername.resolves({
                password: 'password321',
            });
            stubBcryptComparySync.returns(false);
            request.body = {
                username: 'someUser',
                password: 'password123',
            };
            const response = await controller.login()(request) as BadRequestResponse;

            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal('Invalid login');
        });

        it('should return with a token if everything is valid', async () => {
            const expectedToken = 'someValid.jwt.token';
            stubGetUserByUsername.resolves({
                username: 'someUser',
                password: 'password123',
                displayName: 'Jeremy',
                role: 'user',
            });
            stubBcryptComparySync.returns(true);
            stubJwtSign.callsFake(() => expectedToken);

            request.body = {
                username: 'someUser',
                password: 'password123',
            };
            const response = await controller.login()(request) as LoginResponse;

            expect(response.statusCode).to.equal(200);
            expect(response.body.token).to.equal(expectedToken);
        });
    });

    describe('Registration action', () => {
        let request: ControllerRequest<RegistrationRequest>;

        beforeEach(() => {
            request = {} as ControllerRequest<RegistrationRequest>;
        });

        it('should return HTTP 400 if no username is provided', async () => {
            request.body = {
                username: '',
                password: 'password123',
                displayName: 'Jack',
            };
            const response = await controller.registration()(request) as BadRequestResponse;

            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal('Invalid request body');
        });

        it('should return HTTP 400 if no password is provided', async () => {
            request.body = {
                username: 'user4321',
                password: '',
                displayName: 'Jack',
            };
            const response = await controller.registration()(request) as BadRequestResponse;

            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal('Invalid request body');
        });

        it('should return HTTP 400 if no display name is provided', async () => {
            request.body = {
                username: 'user4321',
                password: 'password123',
                displayName: '',
            };
            const response = await controller.registration()(request) as BadRequestResponse;

            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal('Invalid request body');
        });

        it('should return HTTP 400 if username is taken', async () => {
            stubCreateUser.rejects({});

            request.body = {
                username: 'user4321',
                password: 'password123',
                displayName: 'Jack',
            };
            const response = await controller.registration()(request) as BadRequestResponse;

            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal('Username already exists');
        });

        it('should return HTTP 200 if everything is valid', async () => {
            stubCreateUser.resolves({});

            request.body = {
                username: 'user4321',
                password: 'password123',
                displayName: 'Jack',
            };
            const response = await controller.registration()(request);

            expect(response.statusCode).to.equal(200);
        });
    });

    describe('Profile action', () => {
        it('should return HTTP 200', async () => {
            const response = await controller.profile()({} as Request);

            expect(response.statusCode).to.equal(200);
        });
    });
});
