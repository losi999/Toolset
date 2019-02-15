export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export type RegistrationRequest = {
    username: string;
    password: string;
    displayName: string;
};

export type ErrorResponse = {
    error: string;
};
