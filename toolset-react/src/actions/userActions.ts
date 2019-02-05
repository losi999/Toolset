import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserState } from '../reducers/userReducer';
import { LoginRequest, LoginResponse, RegistrationRequest } from '../types';

interface RegistrationRequested {
    type: 'REGISTRATION_REQUESTED';
}
interface RegistrationSucceeded {
    type: 'REGISTRATION_SUCCEEDED';
    payload: any;
}
interface RegistrationFailed {
    type: 'REGISTRATION_FAILED';
    payload: any;
}
interface LoginRequested {
    type: 'LOGIN_REQUESTED';
}
interface LoginSucceeded {
    type: 'LOGIN_SUCCEEDED';
    payload: string;
}
interface LoginFailed {
    type: 'LOGIN_FAILED';
    payload: any;
}

type RegistrationAction = RegistrationRequested | RegistrationSucceeded | RegistrationFailed;
type LoginAction = LoginRequested | LoginSucceeded | LoginFailed;
export type UserAction = RegistrationAction | LoginAction;

const registrationRequested = (): RegistrationRequested => {
    return {
        type: 'REGISTRATION_REQUESTED',
    };
};

const registrationSucceeded = (resp: any): RegistrationSucceeded => {
    return {
        type: 'REGISTRATION_SUCCEEDED',
        payload: resp,
    };
};

const registrationFailed = (error: any): RegistrationFailed => {
    return {
        type: 'REGISTRATION_FAILED',
        payload: error,
    };
};

export const registration = (user: RegistrationRequest): ThunkAction<void, UserState, any, RegistrationAction> => {
    return (dispatch) => {
        dispatch(registrationRequested());

        axios.post(`${process.env.REACT_APP_API_URL}/registration`, user)
            .then((response) => {
                dispatch(registrationSucceeded(response.data));
            })
            .catch((error) => {
                dispatch(registrationFailed(error));
            });
    };
};

const loginRequested = (): LoginRequested => {
    return {
        type: 'LOGIN_REQUESTED',
    };
};

const loginSucceeded = (response: LoginResponse): LoginSucceeded => {
    return {
        type: 'LOGIN_SUCCEEDED',
        payload: response.token,
    };
};

const loginFailed = (error: any): LoginFailed => {
    return {
        type: 'LOGIN_FAILED',
        payload: error,
    };
};

export const login = (user: LoginRequest): ThunkAction<void, UserState, any, LoginAction> => {
    return (dispatch: Dispatch) => {
        dispatch(loginRequested());

        axios.post<LoginResponse>(`${process.env.REACT_APP_API_URL}/login`, user)
            .then((response) => {
                dispatch(loginSucceeded(response.data));
            })
            .catch((error) => {
                dispatch(loginFailed(error));
            });
    };
};
