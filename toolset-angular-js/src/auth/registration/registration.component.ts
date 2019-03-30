import angular from 'angular';

import template from '@/auth/registration/registration.component.html';

class RegistrationController implements angular.IComponentController {
    public static $inject = [];

    constructor() { }
}

const options: angular.IComponentOptions = {
    controller: RegistrationController,
    template,
};

export default options;
