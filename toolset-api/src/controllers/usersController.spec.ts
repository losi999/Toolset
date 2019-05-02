import 'reflect-metadata';
import UsersController from '@/controllers/usersController';
import { UnitOfWork, TokenService, PasswordService, SchemaValidatorService } from '@/models/types/interfaces';
import { ControllerRequest, LoginRequest, RegistrationRequest } from '@/models/types/controllerRequest';
import { BadRequestResponse, LoginResponse, OkResponse } from '@/models/types/controllerResponses';

describe('Users controller', () => {
    let controller: UsersController;
    let mockUnitOfWork: UnitOfWork;
    let mockTokenService: TokenService;
    let mockPasswordService: PasswordService;
    let mockSchemaValidatorService: SchemaValidatorService;
    let mockGetUserByUsername: jest.Mock;
    let mockCreateUser: jest.Mock;
    let mockGenerateToken: jest.Mock;
    let mockCheckPassword: jest.Mock;
    let mockEncryptPassword: jest.Mock;
    let mockValidate: jest.Mock;

    beforeEach(() => {
        mockGetUserByUsername = jest.fn();
        mockCreateUser = jest.fn();
        mockGenerateToken = jest.fn();
        mockCheckPassword = jest.fn();
        mockEncryptPassword = jest.fn();
        mockValidate = jest.fn();

        mockUnitOfWork = new (jest.fn<UnitOfWork, undefined[]>(() => ({
            user: {
                createUser: mockCreateUser,
                getUserByUsername: mockGetUserByUsername,
            },
        })))();

        mockSchemaValidatorService = new (jest.fn<SchemaValidatorService, undefined[]>(() => ({
            validate: mockValidate,
        })))();

        mockTokenService = new (jest.fn<Partial<TokenService>, undefined[]>(() => ({
            generateToken: mockGenerateToken,
        })))() as TokenService;

        mockPasswordService = new (jest.fn<Partial<PasswordService>, undefined[]>(() => ({
            checkPassword: mockCheckPassword,
            encryptPassword: mockEncryptPassword,
        })))() as PasswordService;
        controller = new UsersController(mockUnitOfWork, mockSchemaValidatorService, mockTokenService, mockPasswordService);
    });

    describe('Login action', () => {
        it('should respond with HTTP 400 if request body is invalid', async () => {
            const validationError = 'validationError';
            mockValidate.mockReturnValue(validationError);

            const request = {
                body: {},
            } as ControllerRequest<LoginRequest>;

            const response = await controller.login()(request) as BadRequestResponse;
            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toBe('LG001');
            expect(response.body.data).toBe(validationError);
        });

        it('should return HTTP 400 if user not found', async () => {
            mockValidate.mockReturnValue(undefined);

            mockGetUserByUsername.mockResolvedValue(null);

            const request = {
                body: { username: 'nonExistingUser' },
            } as ControllerRequest<LoginRequest>;

            const response = await controller.login()(request) as BadRequestResponse;
            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toBe('LG002');
        });

        it('should return HTTP 400 if password is incorrect', async () => {
            mockValidate.mockReturnValue(undefined);

            mockGetUserByUsername.mockResolvedValue({
                password: 'encryptedPassword',
            });

            mockCheckPassword.mockReturnValue(false);

            const request = {
                body: { password: 'plainPassword' },
            } as ControllerRequest<LoginRequest>;

            const response = await controller.login()(request) as BadRequestResponse;
            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toBe('LG002');
        });

        it('should return with a token if everything is valid', async () => {
            mockValidate.mockReturnValue(undefined);

            const username = 'user123';
            const displayName = 'John';
            const role = 'user';
            mockGetUserByUsername.mockResolvedValue({
                username,
                displayName,
                role,
                password: 'encryptedPassword',
            });

            mockCheckPassword.mockReturnValue(true);

            const expectedToken = 'some.valid.jwt';
            mockGenerateToken.mockReturnValue(expectedToken);

            const request = {
                body: { password: 'plainPassword' },
            } as ControllerRequest<LoginRequest>;

            const response = await controller.login()(request) as LoginResponse;
            expect(response.statusCode).toBe(200);
            expect(response.body.token).toBe(expectedToken);
            expect(mockGenerateToken).toHaveBeenCalledWith({
                username,
                displayName,
                role,
            });
        });
    });

    describe('Registration action', () => {
        it('should respond with HTTP 400 if request body is invalid', async () => {
            const validationError = 'validationError';
            mockValidate.mockReturnValue(validationError);

            const request = {
                body: {},
            } as ControllerRequest<RegistrationRequest>;

            const response = await controller.registration()(request) as BadRequestResponse;
            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toBe('RG001');
            expect(response.body.data).toBe(validationError);
        });

        it('should return HTTP 400 if username is taken', async () => {
            mockValidate.mockReturnValue(undefined);

            mockCreateUser.mockRejectedValue({});

            const request = {
                body: {},
            } as ControllerRequest<RegistrationRequest>;

            const response = await controller.registration()(request) as BadRequestResponse;
            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toBe('RG002');
        });

        it('should return HTTP 200 if everything is valid', async () => {
            mockValidate.mockReturnValue(undefined);

            mockCreateUser.mockResolvedValue({});

            const username = 'user123';
            const password = 'password';
            const displayName = 'John';
            const request = {
                body: {
                    username,
                    password,
                    displayName,
                },
            } as ControllerRequest<RegistrationRequest>;

            const encryptedPassword = 'encryptedPassword';
            mockEncryptPassword.mockReturnValue(encryptedPassword);

            const response = await controller.registration()(request) as OkResponse;
            expect(response.statusCode).toBe(200);
            expect(mockCreateUser).toHaveBeenCalledWith({
                username,
                displayName,
                role: 'user',
                password: encryptedPassword,
            });
        });
    });

    describe('Profile action', () => {
        it('should return HTTP 200', async () => {
            const response = await controller.profile()({} as ControllerRequest<undefined>);

            expect(response.statusCode).toBe(200);
        });
    });
});
