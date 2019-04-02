import angular from 'angular';

import template from '@/auth/registration/registration.component.html';
import AuthValidatorService from '@/auth/auth-validator.service';
import AuthWebService from '@/auth/auth-web.service';
import { RegistrationFormValidations, RegistrationFormValues } from '@/auth/registration/registration.types';

class RegistrationController implements angular.IComponentController {
    public static $inject = ['authValidator', 'authWeb'];

    public formValues: RegistrationFormValues;
    public formValidations: RegistrationFormValidations;

    constructor(
        private authValidatorService: AuthValidatorService,
        private authWebService: AuthWebService,
    ) {
        this.formValues = {
            username: '',
            password: '',
            passwordConfirm: '',
            displayName: '',
        };

        this.formValidations = {
            username: null,
            password: null,
            passwordConfirm: null,
            displayName: null,
        };
    }

    public onInputChange(): void {
        const { validation } = this.authValidatorService.validateRegistration(this.formValues);
        this.formValidations = {
            ...validation,
        };
    }

    public async onSubmit(): Promise<void> {
        const { isValid, validation } = this.authValidatorService.validateRegistration(this.formValues);
        this.formValidations = {
            ...validation,
        };

        if (isValid) {
            try {
                await this.authWebService.registration(this.formValues);
            } catch (error) {
                console.log('error', error);
            }
        }
    }
}

const options: angular.IComponentOptions = {
    controller: RegistrationController,
    template,
};

export default options;
