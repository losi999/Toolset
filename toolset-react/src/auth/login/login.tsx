import React from 'react';
import { Field, FormErrors, FormSubmitHandler } from 'redux-form';
import 'src/auth/login/login.css';
import { LoginComponentProps, LoginForm } from 'src/auth/login/propTypes';

export const validate = (values: LoginForm): FormErrors<LoginForm> => {
    const errors: FormErrors<LoginForm> = {};

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

const Login: React.FC<LoginComponentProps> = (props) => {
    const onSubmit: FormSubmitHandler<LoginForm> = (values) => {
        props.login(values);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <div>
                {/* <Field
                    name='username'
                    component={textField}
                    type='text'
                    label='Username'
                /> */}
            </div>
            <div>
                {/* <Field
                    name='password'
                    component={textField}
                    type='password'
                    label='Password'
                /> */}
            </div>
            <input type='submit' value='Send' disabled={props.pristine || props.submitting || props.invalid} />
            <div>Token: {props.token}</div>
        </form>
    );
};

export default Login;
