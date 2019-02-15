import React from 'react';
import { Field, FormErrors, FormSubmitHandler, FormWarnings } from 'redux-form';
import textField from '../textField/index';
import { RegistrationComponentProps, RegistrationForm } from './propTypes';
import './registration.css';

export const validate = (values: RegistrationForm): FormErrors<RegistrationForm> => {
    const errors: FormErrors<RegistrationForm> = {};

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

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Required';
    } else {
        if (values.passwordConfirm.length < 4) {
            errors.passwordConfirm = 'Password must be at least 4 characters long';
        }
    }

    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Passwords do not match';
    }

    if (!values.displayName) {
        errors.displayName = 'Required';
    }

    return errors;
};

export const warn = (values: RegistrationForm): FormWarnings<RegistrationForm> => {
    const warnings: FormWarnings<RegistrationForm> = {};

    if (values.username && values.username.length < 6) {
        warnings.username = 'Username should be at least 6 characters long';
    }

    if (values.password && values.password.length < 6) {
        warnings.password = 'Password should be at least 6 characters long';
    }

    if (values.passwordConfirm && values.passwordConfirm.length < 6) {
        warnings.passwordConfirm = 'Password should be at least 6 characters long';
    }

    return warnings;
};

const Registration: React.FC<RegistrationComponentProps> = (props) => {
    const onSubmit: FormSubmitHandler<RegistrationForm> = (values) => {
        props.registration(values);
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
            <div>
                <Field
                    name='passwordConfirm'
                    component={textField}
                    type='password'
                    label='Password confirm'
                />
            </div>
            <div>
                <Field
                    name='displayName'
                    component={textField}
                    type='text'
                    label='Display name'
                />
            </div>
            <input type='submit' value='Send' disabled={props.pristine || props.submitting || props.invalid} />
        </form>
    );
};

export default Registration;
