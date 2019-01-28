import React from 'react';
import './login.css';
import { Field } from 'redux-form';
import textField from './../textField/index';

export const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required';
    } else {
        if (values.username.length < 4) {
            errors.username = 'Username must be at least 4 characters long';
        }
    }

    if (!values.password) {
        errors.password = 'Required';
    } else {
        if (values.password.length < 4) {
            errors.password = 'Password must be at least 4 characters long';
        }
    }

    return errors;
};

const Login = (props) => {
    const onSubmit = (values) => {
        props.login(values);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <div>
                <Field
                    name="username"
                    component={textField}
                    type="text"
                    label="Username"
                />
            </div>
            <div>
                <Field
                    name="password"
                    component={textField}
                    type="password"
                    label="Password"
                />
            </div>
            <input type="submit" value="Send" disabled={props.pristine || props.submitting || props.invalid} />
        </form>
    )
};

export default Login;
