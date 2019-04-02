export interface RegistrationFormValues {
    username: string;
    password: string;
    passwordConfirm: string;
    displayName: string;
}

export interface RegistrationFormValidations {
    form?: {
        usernameTaken: boolean,
    };
    username: {
        minLength?: boolean,
    } | null;
    password: {
        minLength?: boolean,
        strength?: 'weak' | 'medium',
    } | null;
    passwordConfirm: {
        passwordsNotMatch?: boolean,
    } | null;
    displayName: {
        required?: boolean,
    } | null;
}

export interface RegistrationRequest {
    username: string;
    password: string;
    displayName: string;
}
