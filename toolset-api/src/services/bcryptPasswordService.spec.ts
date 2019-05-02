import 'reflect-metadata';
import BcryptPasswordService from '@/services/bcryptPasswordService';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('bcrypt Password service', () => {
    let service: BcryptPasswordService;
    let mockComparySync: jest.SpyInstance;
    let mockHashSync: jest.SpyInstance;

    beforeEach(() => {
        mockComparySync = jest.spyOn(bcrypt, 'compareSync');
        mockHashSync = jest.spyOn(bcrypt, 'hashSync');
        service = new BcryptPasswordService();
    });

    describe('Check password', () => {
        it('should return a boolean returned by compareSync', () => {
            mockComparySync.mockReturnValue(true);

            const isMatch = service.checkPassword('password', 'encrypedPassword');
            expect(isMatch).toBeTruthy();
        });
    });

    describe('Encrypt password', () => {
        it('should return the encrypted password', () => {
            const expectedPassword = 'encryptedPassword';
            mockHashSync.mockReturnValue(expectedPassword);

            const encryptedPassword = service.encryptPassword('password');
            expect(encryptedPassword).toEqual(expectedPassword);
        });
    });
});
