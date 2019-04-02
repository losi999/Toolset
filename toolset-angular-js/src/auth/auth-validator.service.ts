import { LoginFormValidations, LoginFormValues } from '@/auth/login/login.types';
import { RegistrationFormValues, RegistrationFormValidations } from './registration/registration.types';

export default class AuthValidatorService {
    constructor() { }

    public validateLogin(user: LoginFormValues): { isValid: boolean, validation: LoginFormValidations } {
        let isValid = true;
        const validation: LoginFormValidations = {
            username: null,
            password: null,
        };

        if (!user.username) {
            isValid = false;
            validation.username = {
                required: true,
            };
        }

        if (!user.password) {
            isValid = false;
            validation.password = {
                required: true,
            };
        }

        return {
            isValid,
            validation,
        };
    }

    public validateRegistration(user: RegistrationFormValues): { isValid: boolean, validation: RegistrationFormValidations } {
        let isValid = true;
        const validation: RegistrationFormValidations = {
            username: null,
            password: null,
            passwordConfirm: null,
            displayName: null,
        };

        if (!user.username || user.username.length < 4) {
            isValid = false;
            validation.username = {
                minLength: true,
            };
        }

        if (user.password) {
            if (user.password.length < 4) {
                isValid = false;
                validation.password = {
                    minLength: true,
                };
            } else {
                if (user.password.length < 6) {
                    validation.password = {
                        strength: 'weak',
                    };
                } else {
                    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/.test(user.password)) {
                        validation.password = {
                            strength: 'medium',
                        };
                    }
                }
            }
        } else {
            isValid = false;
            validation.password = {
                minLength: true,
            };
        }

        if (!validation.password && user.password !== user.passwordConfirm) {
            isValid = false;
            validation.passwordConfirm = {
                passwordsNotMatch: true,
            };
        }

        if (!user.displayName) {
            isValid = false;
            validation.displayName = {
                required: true,
            };
        }

        return {
            isValid,
            validation,
        };
    }
}
