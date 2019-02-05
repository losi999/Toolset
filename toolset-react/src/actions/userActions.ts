import axios from 'axios';
import { RegistrationRequest, LoginRequest, LoginResponse } from '../types';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserState } from '../reducers/userReducer';

export const REGISTRATION_REQUESTED = 'REGISTRATION_REQUESTED';
export const REGISTRATION_SUCCEEDED = 'REGISTRATION_SUCCEEDED';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

interface RegistrationRequested {
    type: typeof REGISTRATION_REQUESTED
}
interface RegistrationSucceeded {
    type: typeof REGISTRATION_SUCCEEDED
    payload: any;
}
interface RegistrationFailed {
    type: typeof REGISTRATION_FAILED
    payload: any;
}
interface LoginRequested {
    type: typeof LOGIN_REQUESTED
}
interface LoginSucceeded {
    type: typeof LOGIN_SUCCEEDED
    payload: string;
}
interface LoginFailed {
    type: typeof LOGIN_FAILED
    payload: any;
}

type RegistrationAction = RegistrationRequested | RegistrationSucceeded | RegistrationFailed;
type LoginAction = LoginRequested | LoginSucceeded | LoginFailed;
export type UserAction = RegistrationAction | LoginAction;

const registrationRequested = (): RegistrationRequested => {
    return {
        type: REGISTRATION_REQUESTED
    };
};

const registrationSucceeded = (resp: any): RegistrationSucceeded => {
    return {
        type: REGISTRATION_SUCCEEDED,
        payload: resp
    };
};

const registrationFailed = (error: any): RegistrationFailed => {
    return {
        type: REGISTRATION_FAILED,
        payload: error
    };
};

export const registration = (user: RegistrationRequest): ThunkAction<void, UserState, any, RegistrationAction> => {
    return (dispatch) => {
        dispatch(registrationRequested());

        axios.post(`${process.env.REACT_APP_API_URL}/registration`, user)
            .then(response => {
                dispatch(registrationSucceeded(response.data));
            })
            .catch(error => {
                dispatch(registrationFailed(error));
            });
    };
};

const loginRequested = (): LoginRequested => {
    return {
        type: LOGIN_REQUESTED
    };
};

const loginSucceeded = (response: LoginResponse): LoginSucceeded => {
    return {
        type: LOGIN_SUCCEEDED,
        payload: response.token
    };
};

const loginFailed = (error: any): LoginFailed => {
    return {
        type: LOGIN_FAILED,
        payload: error
    };
};

export const login = (user: LoginRequest): ThunkAction<void, UserState, any, LoginAction>  => {
    return (dispatch: Dispatch) => {
        dispatch(loginRequested());

        axios.post<LoginResponse>(`${process.env.REACT_APP_API_URL}/login`, user)
            .then(response => {
                dispatch(loginSucceeded(response.data));
            })
            .catch(error => {
                dispatch(loginFailed(error));
            });
    };
};