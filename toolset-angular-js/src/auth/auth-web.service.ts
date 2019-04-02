import { LoginRequest, LoginResponse } from '@/auth/login/login.types';
import { RegistrationRequest } from '@/auth/registration/registration.types';

export default class AuthWebService {
    public static $inject = ['$http', 'apiUrl'];

    constructor(
        private $http: angular.IHttpService,
        private apiUrl: string,
    ) { }

    public async login(user: LoginRequest): Promise<LoginResponse> {
        const response = await this.$http.post<LoginResponse>(`${this.apiUrl}/login`, user);
        return response.data;
    }

    public async registration(user: RegistrationRequest): Promise<undefined> {
        const response = await this.$http.post<undefined>(`${this.apiUrl}/registration`, user);
        return response.data;
    }
}
