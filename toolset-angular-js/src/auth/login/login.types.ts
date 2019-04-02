export interface LoginFormValues {
    username: string;
    password: string;
}

export interface LoginFormValidations {
    form?: {
        invalidCredentials: boolean;
    };
    username: {
        required: boolean;
    } | null;
    password: {
        required: boolean;
    } | null;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}
