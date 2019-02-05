import React from 'react';
import { Field } from 'redux-form';
import textField from './../textField/index';
import './login.css';

export const validate = (values: any) => {
    const errors: any = {};

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

const Login = (props: any) => {
    const onSubmit = (values: any) => {
        props.login(values);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <div>
                <Field
                    name='username'
                    component={textField}
                    type='text'
                    label='Username'
                />
            </div>
            <div>
                <Field
                    name='password'
                    component={textField}
                    type='password'
                    label='Password'
                />
            </div>
            <input type='submit' value='Send' disabled={props.pristine || props.submitting || props.invalid} />
            <div>Token: {props.token}</div>
        </form>
    );
};

export default Login;
