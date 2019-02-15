import axios, { AxiosPromise } from 'axios';
import { LoginRequest, LoginResponse, RegistrationRequest } from '../types';

class UserService {
    public login(user: LoginRequest): AxiosPromise<LoginResponse> {
        return axios.post<LoginResponse>(`${process.env.REACT_APP_API_URL}/login`, user);
    }

    public registration(user: RegistrationRequest): AxiosPromise<void> {
        return axios.post(`${process.env.REACT_APP_API_URL}/registration`, user);
    }
}

export default new UserService();
