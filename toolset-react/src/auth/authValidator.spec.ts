import { validateLogin, validateRegistration } from 'src/auth/authValidator';

describe('Login validation', () => {
    const validValues = {
        username: 'user123',
        password: 'pwd123',
    };

    it('should be valid', () => {
        const { isValid, validation } = validateLogin(validValues);

        expect(isValid).toBe(true);
        expect(validation).toEqual({
            username: null,
            password: null,
        });
    });

    it('should be invalid for empty username', () => {
        const { isValid, validation } = validateLogin({
            ...validValues,
            username: '',
        });

        expect(isValid).toBe(false);
        expect(validation).toEqual({
            username: {
                required: true,
            },
            password: null,
        });
    });

    it('should be invalid for empty password', () => {
        const { isValid, validation } = validateLogin({
            ...validValues,
            password: '',
        });

        expect(isValid).toBe(false);
        expect(validation).toEqual({
            username: null,
            password: {
                required: true,
            },
        });
    });
});

describe('Registration validation', () => {
    const validValues = {
        username: 'user123',
        password: 'Pwd12345',
        passwordConfirm: 'Pwd12345',
        displayName: 'dname',
    };

    it('should be valid', () => {
        const { isValid, validation } = validateRegistration(validValues);

        expect(isValid).toBe(true);
        expect(validation).toEqual({
            username: null,
            password: null,
            passwordConfirm: null,
            displayName: null,
        });
    });

    it('should be invalid for username that is shorter than 4 characters', () => {
        const { isValid, validation } = validateRegistration({
            ...validValues,
            username: 'usr',
        });

        expect(isValid).toBe(false);
        expect(validation).toEqual({
            username: {
                minLength: true,
            },
            password: null,
            passwordConfirm: null,
            displayName: null,
        });
    });

    it('should be invalid for password that is missing', () => {
        const { isValid, validation } = validateRegistration({
            ...validValues,
            password: '',
        });

        expect(isValid).toBe(false);
        expect(validation).toEqual({
            username: null,
            password: {
                minLength: true,
            },
            passwordConfirm: null,
            displayName: null,
        });
    });

    it('should be invalid for password that is shorter than 4 characters', () => {
        const { isValid, validation } = validateRegistration({
            ...validValues,
            password: 'pwd',
        });

        expect(isValid).toBe(false);
        expect(validation).toEqual({
            username: null,
            password: {
                minLength: true,
            },
            passwordConfirm: null,
            displayName: null,
        });
    });

    it('should be valid with warning for password that is shorter than 6 characters', () => {
        const { isValid, validation } = validateRegistration({
            ...validValues,
            password: 'pwd12',
        });

        expect(isValid).toBe(true);
        expect(validation).toEqual({
            username: null,
            password: {
                strength: 'weak',
            },
            passwordConfirm: null,
            displayName: null,
        });
    });

    it('should be valid with warning for password that is at least 6 characters', () => {
        const { isValid, validation } = validateRegistration({
            ...validValues,
            password: 'pwd12345',
        });

        expect(isValid).toBe(true);
        expect(validation).toEqual({
            username: null,
            password: {
                strength: 'medium',
            },
            passwordConfirm: null,
            displayName: null,
        });
    });

    it('should be invalid for passwords that do not match', () => {
        const { isValid, validation } = validateRegistration({
            ...validValues,
            password: 'Pwd12345',
            passwordConfirm: 'Pwd54321',
        });

        expect(isValid).toBe(false);
        expect(validation).toEqual({
            username: null,
            password: null,
            passwordConfirm: {
                passwordsNotMatch: true,
            },
            displayName: null,
        });
    });

    it('should be invalid for display name that is missing', () => {
        const { isValid, validation } = validateRegistration({
            ...validValues,
            displayName: '',
        });

        expect(isValid).toBe(false);
        expect(validation).toEqual({
            username: null,
            password: null,
            passwordConfirm: null,
            displayName: {
                required: true,
            },
        });
    });
});
