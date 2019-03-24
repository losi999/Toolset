export type RegistrationFormFields = keyof RegistrationFormValues;

export type RegistrationFormValues = {
    username: string;
    password: string;
    passwordConfirm: string;
    displayName: string;
};

export type RegistrationFormTouches = {
    [P in RegistrationFormFields]: boolean;
};

export type RegistrationFormValidations = {
    form?: {
        usernameTaken: boolean,
    }
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
};
