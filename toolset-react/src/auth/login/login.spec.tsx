import React from 'react';
import { fireEvent, getByLabelText, getByText, getByValue, render } from 'react-testing-library';
import authService from 'src/auth/authService';
import * as validator from 'src/auth/authValidator';
import Login from 'src/auth/login/login';

describe('Login component', () => {
    let container: HTMLElement;
    let usernameInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let submitButton: HTMLButtonElement;
    let loginSpy: jest.SpyInstance;
    let validateLoginSpy: jest.SpyInstance;

    beforeEach(() => {
        container = render(<Login />).container;
        usernameInput = getByLabelText(container, 'Username') as HTMLInputElement;
        passwordInput = getByLabelText(container, 'Password') as HTMLInputElement;
        submitButton = getByValue(container, 'Send') as HTMLButtonElement;
        loginSpy = jest.spyOn(authService, 'login');
        validateLoginSpy = jest.spyOn(validator, 'validateLogin');
    });

    it('should create component', () => {
        expect(container).toBeDefined();
    });

    it('should initialize form', () => {
        expect(usernameInput.value).toBe('');
        expect(passwordInput.value).toBe('');
    });

    it('should set username input value if it is changed', () => {
        const usernameValue = 'user123';
        fireEvent.change(usernameInput, {
            target: {
                value: usernameValue,
            },
        });
        expect(usernameInput.value).toBe(usernameValue);
    });

    it('should not call login if form is invalid', () => {
        validateLoginSpy.mockReturnValue({
            isValid: false,
            validation: {},
        });
        fireEvent.click(submitButton);
        expect(loginSpy).not.toHaveBeenCalled();
    });

    it('should display error message if username is missing', () => {
        validateLoginSpy.mockReturnValue({
            isValid: false,
            validation: {
                username: {
                    required: true,
                },
            },
        });
        fireEvent.click(submitButton);
        expect(getByText(container, 'Username is required')).toBeDefined();
    });

    it('should display error message if password is missing', () => {
        validateLoginSpy.mockReturnValue({
            isValid: false,
            validation: {
                password: {
                    required: true,
                },
            },
        });
        fireEvent.click(submitButton);
        expect(getByText(container, 'Password is required')).toBeDefined();
    });

    it('should call login if form is valid', () => {
        validateLoginSpy.mockReturnValue({
            isValid: true,
            validation: {},
        });
        loginSpy.mockResolvedValue({});
        fireEvent.click(submitButton);
        expect(loginSpy).toHaveBeenCalled();
    });

    it.skip('should call login if form is valid and display error if credentials are invalid', async () => {
        validateLoginSpy.mockReturnValue({
            isValid: true,
            validation: {},
        });
        loginSpy.mockRejectedValue({});
        fireEvent.click(submitButton);
        expect(loginSpy).toHaveBeenCalled();
        expect(getByText(container, 'Invalid login credentials')).toBeDefined();
    });
});
