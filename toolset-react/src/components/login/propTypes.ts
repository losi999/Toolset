import { LoginRequest } from '../../types';
import { InjectedFormProps } from 'redux-form';

export interface LoginDispatchProps {
    login(user: LoginRequest): void;
}

export interface LoginStateProps {
    token: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export type LoginProps = LoginDispatchProps & LoginStateProps & InjectedFormProps<LoginForm, LoginDispatchProps & LoginStateProps>;