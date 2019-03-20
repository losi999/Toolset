export type LoginFormFields = 'username' | 'password';

export type LoginFormValues = {
    [P in LoginFormFields]: string;
};
