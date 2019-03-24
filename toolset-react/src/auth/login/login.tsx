import React, { useState } from 'react';
import authService from 'src/auth/authService';
import { validateLogin } from 'src/auth/authValidator';
import 'src/auth/login/login.css';
import { LoginFormFields, LoginFormValidations, LoginFormValues } from 'src/auth/login/propTypes';

const Login: React.FC = () => {
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const { isValid, validation } = validateLogin(formValues);
        setFormError(validation);

        if (isValid) {
            try {
                const response = await authService.login(formValues);
            } catch (error) {
                setFormError({
                    ...formErrors,
                    form: {
                        invalidCredentials: true,
                    },
                });
            }
        }
    };

    const [formValues, setFormValue] = useState<LoginFormValues>({
        username: '',
        password: '',
    });

    const [formErrors, setFormError] = useState<LoginFormValidations>({
        username: null,
        password: null,
    });

    const onChangeInput = (fieldName: LoginFormFields) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue({
                ...formValues,
                [fieldName]: event.target.value,
            });
        };
    };

    const renderValidationErrors = () => {
        return (
            <ul>
                {formErrors.username && formErrors.username.required ?
                    (<li>Username is required</li>) : null}
                {formErrors.password && formErrors.password.required ?
                    (<li>Password is required</li>) : null}
                {formErrors.form && formErrors.form.invalidCredentials ?
                    (<li>Invalid login credentials</li>) : null}
            </ul>
        );
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        Username
                        <input
                            value={formValues.username}
                            className='login-form__username'
                            name='username'
                            type='text'
                            placeholder='Username'
                            onChange={onChangeInput('username')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input
                            value={formValues.password}
                            className='login-form__password'
                            name='password'
                            type='password'
                            placeholder='Password'
                            onChange={onChangeInput('password')}
                        />
                    </label>
                </div>
                {renderValidationErrors()}
                <input className='login-form__submit' type='submit' value='Send' />
            </form>
        </div >
    );
};

export default Login;
