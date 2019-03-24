export type LoginFormFields = keyof LoginFormValues;

export type LoginFormValues = {
    username: string;
    password: string;
};

export type LoginFormValidations = {
    form?: {
        invalidCredentials: boolean,
    },
    username: {
        required: boolean,
    } | null,
    password: {
        required: boolean,
    } | null,
};
