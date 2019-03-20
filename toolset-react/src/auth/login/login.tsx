import React, { useState } from 'react';
import 'src/auth/login/login.css';
import { LoginFormFields, LoginFormValues } from 'src/auth/login/propTypes';

const Login: React.FC = () => {
    const [formValues, setFormValue] = useState<LoginFormValues>({
        username: '',
        password: '',
    });

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log('values', formValues);
    };

    const onInputValueChange = (fieldName: LoginFormFields) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(fieldName, event.target.value);
        };
    };

    const setFieldValue = (fieldName: LoginFormFields, value: string) => {
        setFormValue({
            ...formValues,
            [fieldName]: value,
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        Username
                        <input
                            value={formValues.username}
                            onChange={onInputValueChange('username')}
                            className='login-form__username'
                            name='username'
                            type='text'
                            placeholder='Username'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input
                            value={formValues.password}
                            onChange={onInputValueChange('password')}
                            className='login-form__password'
                            name='password'
                            type='password'
                            placeholder='Password'
                        />
                    </label>
                </div>
                <input className='login-form__submit' type='submit' value='Send' />
            </form>
        </div >
    );
};

export default Login;
