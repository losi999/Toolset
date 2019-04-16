import angular from 'angular';

import template from './login.component.html';
import AuthValidatorService from '@/auth/auth-validator.service';
import { LoginFormValidations, LoginFormValues } from '@/auth/login/login.types';
import AuthWebService from '@/auth/auth-web.service';

class LoginController implements angular.IComponentController {
    public static $inject = ['authValidator', 'authWeb', '$scope'];

    public formValues: LoginFormValues;
    public formValidations: LoginFormValidations;

    constructor(
        private authValidatorService: AuthValidatorService,
        private authWebService: AuthWebService,
        private $scope: angular.IScope,
    ) {
        this.formValues = {
            username: '',
            password: '',
        };
        this.formValidations = {
            username: null,
            password: null,
        };
    }

    public async onSubmit(): Promise<void> {
        const { isValid, validation } = this.authValidatorService.validateLogin(this.formValues);
        this.formValidations = {
            ...validation,
        };

        if (isValid) {
            try {
                const response = await this.authWebService.login(this.formValues);
                console.log('token', response.token);
            } catch (error) {
                this.formValidations = {
                    ...this.formValidations,
                    form: {
                        invalidCredentials: true,
                    },
                };
                this.$scope.$digest();
            }
        }
    }
}

const options: angular.IComponentOptions = {
    controller: LoginController,
    template,
};

export default options;
