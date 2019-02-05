import axios from 'axios';

const registrationRequested = () => {
    return {
        type: 'REGISTRATION_REQUESTED'
    };
};

const registrationSucceeded = () => {
    return {
        type: 'REGISTRATION_SUCCEEDED'
    };
};

const registrationFailed = () => {
    return {
        type: 'REGISTRATION_FAILED'
    };
};

export const registration = (user: any) => {
    return (dispatch: any) => {
        dispatch(registrationRequested());

        axios.post(`${process.env.REACT_APP_API_URL}/registration`, user)
            .then(response => {
                dispatch(registrationSucceeded());
            })
            .catch(error => {
                dispatch(registrationFailed());
            });
    };
};

const loginRequested = () => {
    return {
        type: 'LOGIN_REQUESTED'
    };
};

const loginSucceeded = () => {
    return {
        type: 'LOGIN_SUCCEEDED'
    };
};

const loginFailed = () => {
    return {
        type: 'LOGIN_FAILED'
    };
};

export const login = (user: any) => {
    return (dispatch: any) => {
        dispatch(loginRequested());

        axios.post(`${process.env.REACT_APP_API_URL}/login`, user)
            .then(response => {
                dispatch(loginSucceeded());
            })
            .catch(error => {
                dispatch(loginFailed());
            });
    };
};