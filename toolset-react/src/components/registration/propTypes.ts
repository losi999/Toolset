import { InjectedFormProps } from 'redux-form';
import { RegistrationRequest } from '../../types';

export type RegistrationStateProps = {};

export type RegistrationDispatchProps = {
    registration(user: RegistrationRequest): void;
};

export type RegistrationForm = {
    username: string;
    password: string;
    passwordConfirm: string;
    displayName: string;
};
export type RegistrationProps = RegistrationStateProps & RegistrationDispatchProps;

export type RegistrationComponentProps = RegistrationProps & InjectedFormProps<RegistrationForm, RegistrationProps>;
