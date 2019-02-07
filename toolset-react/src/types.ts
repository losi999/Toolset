export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegistrationRequest {
    username: string;
    password: string;
    displayName: string;
}

export interface ErrorResponse {
    error: string;
}
