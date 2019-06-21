import 'reflect-metadata';
import AuthController from '@/controllers/authController';
import { TokenService } from '@/models/types/interfaces';
import { UnauthorizedResponse, ForbiddenResponse } from '@/models/types/controllerResponses';

describe('Auth controller', () => {
    let controller: AuthController;
    let mockTokenService: TokenService;
    let mockVerifyToken: jest.Mock;

    beforeEach(() => {
        mockVerifyToken = jest.fn();

        mockTokenService = new (jest.fn<Partial<TokenService>, undefined[]>(() => ({
            verifyToken: mockVerifyToken,
        })))() as TokenService;

        controller = new AuthController(mockTokenService);
    });

    it('should return HTTP 401 if no token if provided', async () => {
        const request = {
            headers: {
                authorization: '',
            },
        };

        const response = await controller.authorize('user')(request) as UnauthorizedResponse;
        expect(response.statusCode).toBe(401);
    });

    it('should return HTTP 401 if an invalid token if provided', async () => {
        const request = {
            headers: {
                authorization: 'invalid.jwt.token',
            },
        };

        mockVerifyToken.mockImplementation(() => {
            throw new Error();
        });

        const response = await controller.authorize('user')(request) as UnauthorizedResponse;
        expect(response.statusCode).toBe(401);
    });

    it('should return HTTP 403 if user is not among given roles', async () => {
        const request = {
            headers: {
                authorization: 'user.jwt.token',
            },
        };

        mockVerifyToken.mockReturnValue({
            role: 'user',
        });

        const response = await controller.authorize('admin')(request) as ForbiddenResponse;
        expect(response.statusCode).toBe(403);
    });

    it('should return nothing if authorization is successful', async () => {
        const request = {
            headers: {
                authorization: 'user.jwt.token',
            },
        };

        mockVerifyToken.mockReturnValue({
            role: 'user',
        });

        const response = await controller.authorize('user')(request);
        expect(response).toBeUndefined();
    });
});
