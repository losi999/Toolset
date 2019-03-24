import axios from 'axios';
import authService from 'src/auth/authService';

describe('Auth service', () => {
    let postSpy: jest.SpyInstance;

    beforeEach(() => {
        postSpy = jest.spyOn(axios, 'post');
        process.env.REACT_APP_API_URL = 'http://some.url';
    });

    afterEach(() => {
        process.env.REACT_APP_API_URL = '';
    });

    it('should send login request with given data', () => {
        const loginParams = {
            username: '',
            password: '',
        };
        postSpy.mockResolvedValue({});
        authService.login(loginParams);

        expect(postSpy).toHaveBeenCalledWith('http://some.url/login', loginParams);
    });

    it('should send registration request with given data', () => {
        const registrationParams = {
            username: '',
            password: '',
            displayName: '',
        };
        postSpy.mockResolvedValue({});
        authService.registration(registrationParams);

        expect(postSpy).toHaveBeenCalledWith('http://some.url/registration', registrationParams);
    });
});
