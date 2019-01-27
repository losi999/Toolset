import axios from 'axios';

const registerRequested = () => {
    return {
        type: 'REGISTER_REQUESTED'
    };
};

const registerSucceeded = () => {
    return {
        type: 'REGISTER_SUCCEEDED'
    };
};

const registerFailed = () => {
    return {
        type: 'REGISTER_FAILED'
    };
};

export const register = (user) => {
    return (dispatch) => {
        dispatch(registerRequested());

        axios.post(`${process.env.REACT_APP_API_URL}/register`, user)
            .then(response => {
                dispatch(registerSucceeded());
            })
            .catch(error => {
                dispatch(registerFailed());
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

export const login = (user) => {
    return (dispatch) => {
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