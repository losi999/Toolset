import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import UsersController from './usersController';
import { IUnitOfWork } from '../interfaces';

describe('Users controller', () => {
    let controller: UsersController;

    beforeEach(() => {
        controller = new UsersController({} as IUnitOfWork);
    });

    describe('Login action', () => {
        it('should return return BadRequest if no username is provided', async () => {
            const response = await controller.login()({
                body: {
                    username: '',
                    password: 'password123',
                },
            });

            expect(response.statusCode).to.equal(200);
        });
    });
});
