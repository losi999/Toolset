import React from 'react';
import './login.css';
import { Field } from 'redux-form';

const Login = (props) => {
    const onSubmit = (values) => {
        props.login(values);
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
            <input type="submit" value="Send"></input>
        </form>
    )
};

export default Login;
