import React from 'react';
import { fireEvent, getByLabelText, getByText, getByValue, render } from 'react-testing-library';
import authService from 'src/auth/authService';
import * as validator from 'src/auth/authValidator';
import Registration from 'src/auth/registration/registration';

describe('Registration component', () => {
    let container: HTMLElement;
    let usernameInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let passwordConfirmInput: HTMLInputElement;
    let displayNameInput: HTMLInputElement;
    let submitButton: HTMLButtonElement;
    let registrationSpy: jest.SpyInstance;
    let validateRegistrationSpy: jest.SpyInstance;

    beforeEach(() => {
        container = render(<Registration />).container;
        usernameInput = getByLabelText(container, 'Username') as HTMLInputElement;
        passwordInput = getByLabelText(container, 'Password') as HTMLInputElement;
        passwordConfirmInput = getByLabelText(container, 'Password confirm') as HTMLInputElement;
        displayNameInput = getByLabelText(container, 'Display name') as HTMLInputElement;
        submitButton = getByValue(container, 'Send') as HTMLButtonElement;
        registrationSpy = jest.spyOn(authService, 'registration');
        validateRegistrationSpy = jest.spyOn(validator, 'validateRegistration');
    });

    it('should create component', () => {
        expect(container).toBeDefined();
    });

    it('should initialize form', () => {
        expect(usernameInput.value).toBe('');
        expect(passwordInput.value).toBe('');
        expect(passwordConfirmInput.value).toBe('');
        expect(displayNameInput.value).toBe('');
    });

    it('should set username input value if it is changed', () => {
        validateRegistrationSpy.mockReturnValue({
            validation: {},
        });
        const usernameValue = 'user123';
        fireEvent.change(usernameInput, {
            target: {
                value: usernameValue,
            },
        });
        expect(usernameInput.value).toBe(usernameValue);
    });

    it('should not call registration if form is invalid', () => {
        validateRegistrationSpy.mockReturnValue({
            isValid: false,
            validation: {},
        });
        fireEvent.click(submitButton);
        expect(registrationSpy).not.toHaveBeenCalled();
    });

    it('should call registration if form is valid', () => {
        validateRegistrationSpy.mockReturnValue({
            isValid: true,
            validation: {},
        });
        registrationSpy.mockResolvedValue({});
        fireEvent.click(submitButton);
        expect(registrationSpy).toHaveBeenCalled();
    });

    it('should display error message if username is shorter than 4 characters', () => {
        validateRegistrationSpy.mockReturnValue({
            validation: {
                username: {
                    minLength: true,
                },
            },
        });
        fireEvent.change(usernameInput, {
            target: {
                value: '',
            },
        });
        fireEvent.blur(usernameInput);
        expect(getByText(container, 'Username must be at least 4 characters long')).toBeDefined();
    });

    it('should display error message if password is shorter than 4 characters', () => {
        validateRegistrationSpy.mockReturnValue({
            validation: {
                password: {
                    minLength: true,
                },
            },
        });
        fireEvent.change(passwordInput, {
            target: {
                value: '',
            },
        });
        fireEvent.blur(passwordInput);
        expect(getByText(container, 'Password must be at least 4 characters long')).toBeDefined();
    });

    it('should warn with "weak" message if password is between 4 and 6 characters', () => {
        validateRegistrationSpy.mockReturnValue({
            validation: {
                password: {
                    strength: 'weak',
                },
            },
        });
        fireEvent.change(passwordInput, {
            target: {
                value: '',
            },
        });
        fireEvent.blur(passwordInput);
        expect(getByText(container, 'Password is weak')).toBeDefined();
    });

    it('should warn with "medium" message if password is at least 6 characters but does not contain lowercase, uppercase letters and numbers', () => {
        validateRegistrationSpy.mockReturnValue({
            validation: {
                password: {
                    strength: 'medium',
                },
            },
        });
        fireEvent.change(passwordInput, {
            target: {
                value: '',
            },
        });
        fireEvent.blur(passwordInput);
        expect(getByText(container, 'Password is medium')).toBeDefined();
    });

    it('should display error message if display name is missing', () => {
        validateRegistrationSpy.mockReturnValue({
            validation: {
                displayName: {
                    required: true,
                },
            },
        });
        fireEvent.change(displayNameInput, {
            target: {
                value: '',
            },
        });
        fireEvent.blur(displayNameInput);
        expect(getByText(container, 'Display name is required')).toBeDefined();
    });

    it('should display error message if passwords do not match', () => {
        validateRegistrationSpy.mockReturnValue({
            validation: {
                passwordConfirm: {
                    passwordsNotMatch: true,
                },
            },
        });
        fireEvent.change(passwordConfirmInput, {
            target: {
                value: '',
            },
        });
        fireEvent.blur(passwordConfirmInput);
        expect(getByText(container, 'Passwords do not match')).toBeDefined();
    });

    it.skip('should display error message if registration fails', () => {
        // TODO
    });
});
