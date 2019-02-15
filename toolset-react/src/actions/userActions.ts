import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Store } from '../store';
import { ErrorResponse, LoginRequest, LoginResponse, RegistrationRequest } from '../types';
import userService from './../services/userService';

type RegistrationRequested = {
    type: 'REGISTRATION_REQUESTED';
};
type RegistrationSucceeded = {
    type: 'REGISTRATION_SUCCEEDED';
};
type RegistrationFailed = {
    type: 'REGISTRATION_FAILED';
    payload: ErrorResponse;
};
type LoginRequested = {
    type: 'LOGIN_REQUESTED';
};
type LoginSucceeded = {
    type: 'LOGIN_SUCCEEDED';
    payload: string;
};
type LoginFailed = {
    type: 'LOGIN_FAILED';
    payload: ErrorResponse;
};

type RegistrationAction = RegistrationRequested | RegistrationSucceeded | RegistrationFailed;
type LoginAction = LoginRequested | LoginSucceeded | LoginFailed;
export type UserAction = RegistrationAction | LoginAction;

const registrationRequested = (): RegistrationRequested => {
    return {
        type: 'REGISTRATION_REQUESTED',
    };
};

const registrationSucceeded = (): RegistrationSucceeded => {
    return {
        type: 'REGISTRATION_SUCCEEDED',
    };
};

const registrationFailed = (error: ErrorResponse): RegistrationFailed => {
    return {
        type: 'REGISTRATION_FAILED',
        payload: error,
    };
};

export const registration = (user: RegistrationRequest): ThunkAction<void, Store, undefined, RegistrationAction> => {
    return async (dispatch) => {
        dispatch(registrationRequested());

        try {
            await userService.registration(user);
            dispatch(registrationSucceeded());
        } catch (error) {
            dispatch(registrationFailed(error));
        }
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

const loginFailed = (error: ErrorResponse): LoginFailed => {
    return {
        type: 'LOGIN_FAILED',
        payload: error,
    };
};

export const login = (user: LoginRequest): ThunkAction<void, Store, undefined, LoginAction> => {
    return async (dispatch: Dispatch) => {
        dispatch(loginRequested());

        try {
            const response = await userService.login(user);
            dispatch(loginSucceeded(response.data));
        } catch (error) {
            dispatch(loginFailed(error));
        }
    };
};
