import React from 'react';
import './register.css';
import { Field } from 'redux-form';

const Register = (props) => {
    const onSubmit = (values) => {
        props.register(values);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <div>
                <label>
                    Username
                    <Field
                        name="username"
                        component="input"
                        type="text" />
                </label>
            </div>
            <div>
                <label>
                    Password
                    <Field
                        name="password"
                        component="input"
                        type="password" />
                </label>
            </div>
            <div>
                <label>
                    Password confirm
                    <Field
                        name="passwordConfirm"
                        component="input"
                        type="password" />
                </label>
            </div>
            <div>
                <label>
                    Display name
                    <Field
                        name="displayName"
                        component="input"
                        type="text" />
                </label>
            </div>
            <input type="submit" value="Send"></input>
        </form>
    )
};

export default Register;