import React, { useState } from 'react';
import 'src/auth/registration/registration.css';
import { RegistrationFormFields, RegistrationFormValues } from './propTypes';

const Registration: React.FC = () => {
    const [formValues, setFormValue] = useState<RegistrationFormValues>({
        displayName: '',
        password: '',
        passwordConfirm: '',
        username: '',
    });

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log('values', formValues);
    };

    const onInputValueChange = (fieldName: RegistrationFormFields) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(fieldName, event.target.value);
        };
    };

    const setFieldValue = (fieldName: RegistrationFormFields, value: string) => {
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
                            className='registration-form__username'
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
                            className='registration-form__password'
                            name='password'
                            type='password'
                            placeholder='Password'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password confirm
                    <input
                            value={formValues.passwordConfirm}
                            onChange={onInputValueChange('passwordConfirm')}
                            className='registration-form__passwordConfirm'
                            name='passwordConfirm'
                            type='password'
                            placeholder='Password confirm'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Display name
                    <input
                            value={formValues.displayName}
                            onChange={onInputValueChange('displayName')}
                            className='registration-form__displayName'
                            name='displayName'
                            type='text'
                            placeholder='Display name'
                        />
                    </label>
                </div>
                <input className='registration-form__submit' type='submit' value='Send' />
            </form>
        </div>
    );
};

export default Registration;
