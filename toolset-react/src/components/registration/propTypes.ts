import { RegistrationRequest } from '../../types';
import { InjectedFormProps } from 'redux-form';

export interface RegistrationDispatchProps {
    registration(user: RegistrationRequest): void;
}

export interface RegistrationForm {
    username: string;
    password: string;
    passwordConfirm: string;
    displayName: string;
}

export type RegistrationProps = RegistrationDispatchProps & InjectedFormProps<RegistrationForm, RegistrationDispatchProps>;