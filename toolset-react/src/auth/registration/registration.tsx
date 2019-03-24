import React, { useState } from 'react';
import authService from 'src/auth/authService';
import { validateRegistration } from 'src/auth/authValidator';
import { RegistrationFormFields, RegistrationFormTouches, RegistrationFormValidations, RegistrationFormValues } from 'src/auth/registration/propTypes';
import 'src/auth/registration/registration.css';

const Registration: React.FC = () => {
    const [formValues, setFormValue] = useState<RegistrationFormValues>({
        username: '',
        password: '',
        passwordConfirm: '',
        displayName: '',
    });

    const [formErrors, setFormError] = useState<RegistrationFormValidations>({
        username: null,
        password: null,
        passwordConfirm: null,
        displayName: null,
    });

    const [touchedInputs, setInputTouched] = useState<RegistrationFormTouches>({
        username: false,
        password: false,
        passwordConfirm: false,
        displayName: false,
    });

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setInputTouched({
            username: true,
            password: true,
            passwordConfirm: true,
            displayName: true,
        });

        const { isValid, validation } = validateRegistration(formValues);
        setFormError(validation);
        if (isValid) {
            try {
                const response = await authService.registration(formValues);
                console.log('response', response);
            } catch (error) {
                console.log('error', error);
            }
        }
    };

    const onChangeInput = (fieldName: RegistrationFormFields) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValues = {
                ...formValues,
                [fieldName]: event.target.value,
            };
            const { validation } = validateRegistration(newValues);
            setFormValue(newValues);
            setFormError(validation);
        };
    };

    const onBlurInput = (fieldName: RegistrationFormFields) => {
        return () => {
            const { validation } = validateRegistration(formValues);
            setFormError(validation);
            setInputTouched({
                ...touchedInputs,
                [fieldName]: true,
            });
        };
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        Username
                        <input
                            value={formValues.username}
                            onChange={onChangeInput('username')}
                            onBlur={onBlurInput('username')}
                            className='registration-form__username'
                            name='username'
                            type='text'
                            placeholder='Username'
                        />
                    </label>
                    {touchedInputs.username && formErrors.username && formErrors.username.minLength ?
                        (<span>Username must be at least 4 characters long</span>) : null}
                </div>
                <div>
                    <label>
                        Password
                        <input
                            value={formValues.password}
                            onChange={onChangeInput('password')}
                            onBlur={onBlurInput('password')}
                            className='registration-form__password'
                            name='password'
                            type='password'
                            placeholder='Password'
                        />
                    </label>
                    {touchedInputs.password && formErrors.password && formErrors.password.minLength ?
                        (<span>Password must be at least 4 characters long</span>) : null}
                    {touchedInputs.password && formErrors.password && formErrors.password.strength === 'weak' ?
                        (<span>Password is weak</span>) : null}
                    {touchedInputs.password && formErrors.password && formErrors.password.strength === 'medium' ?
                        (<span>Password is medium</span>) : null}
                </div>
                <div>
                    <label>
                        Password confirm
                    <input
                            value={formValues.passwordConfirm}
                            onChange={onChangeInput('passwordConfirm')}
                            onBlur={onBlurInput('passwordConfirm')}
                            className='registration-form__passwordConfirm'
                            name='passwordConfirm'
                            type='password'
                            placeholder='Password confirm'
                        />
                    </label>
                    {touchedInputs.passwordConfirm && formErrors.passwordConfirm && formErrors.passwordConfirm.passwordsNotMatch ?
                        (<span>Passwords do not match</span>) : null}
                </div>
                <div>
                    <label>
                        Display name
                    <input
                            value={formValues.displayName}
                            onChange={onChangeInput('displayName')}
                            onBlur={onBlurInput('displayName')}
                            className='registration-form__displayName'
                            name='displayName'
                            type='text'
                            placeholder='Display name'
                        />
                    </label>
                    {touchedInputs.displayName && formErrors.displayName && formErrors.displayName.required ?
                        (<span>Display name is required</span>) : null}
                </div>
                <input className='registration-form__submit' type='submit' value='Send' />
            </form>
        </div>
    );
};

export default Registration;
