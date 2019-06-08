import 'reflect-metadata';
import JwtTokenService from '@/services/jwtTokenService';
import jsonwebtoken from 'jsonwebtoken';
import { TokenClaims } from '@/models/types/types';

jest.mock('jsonwebtoken');

describe('JWT Token service', () => {
    let service: JwtTokenService;
    let mockSign: jest.SpyInstance;
    let mockVerify: jest.SpyInstance;

    beforeEach(() => {
        mockSign = jest.spyOn(jsonwebtoken, 'sign');
        mockVerify = jest.spyOn(jsonwebtoken, 'verify');
        service = new JwtTokenService();

        process.env.JWT_SECRET = 'jwtsecret';
    });

    afterEach(() => {
        process.env.JWT_SECRET = '';
    });

    describe('Generate token', () => {
        it('should throw error if JWT_SECRET is not set', () => {
            process.env.JWT_SECRET = '';

            try {
                service.generateToken({} as TokenClaims);
            } catch (error) {
                expect(error.message).toEqual('JWT_SECRET env variable needs to be set');
            }
        });

        it('should return a token generated by sign', () => {
            const token = 'generated.token';
            mockSign.mockReturnValue(token);

            const generatedToken = service.generateToken({} as TokenClaims);
            expect(generatedToken).toEqual(token);
        });
    });

    describe('Verify token', () => {
        it('should throw error if JWT_SECRET is not set', () => {
            process.env.JWT_SECRET = '';

            try {
                service.verifyToken('');
            } catch (error) {
                expect(error.message).toEqual('JWT_SECRET env variable needs to be set');
            }
        });

        it('should return the claims generated by verify', () => {
            const claims: TokenClaims = {
                role: 'user',
                displayName: 'John',
                username: 'user123',
            };
            mockVerify.mockReturnValue(claims);

            const generatedClaims = service.verifyToken('');
            expect(generatedClaims).toEqual(claims);
        });
    });
});
