import { InjectedFormProps } from 'redux-form';
import { LoginRequest } from '../../types';

export type LoginDispatchProps = {
    login(user: LoginRequest): void;
};

export type LoginStateProps = {
    token: string;
};

export type LoginForm = {
    username: string;
    password: string;
};
export type LoginProps = LoginDispatchProps & LoginStateProps;

export type LoginComponentProps = LoginProps & InjectedFormProps<LoginForm, LoginProps>;
