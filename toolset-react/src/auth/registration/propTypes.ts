export type RegistrationFormFields = 'username' | 'password' | 'passwordConfirm' | 'displayName';

export type RegistrationFormValues = {
    [P in RegistrationFormFields]: string;
};
