import angular from 'angular';

import template from '@/auth/login/login.component.html';

class LoginController implements angular.IComponentController {
    public static $inject = [];

    constructor() { }
}

const options: angular.IComponentOptions = {
    controller: LoginController,
    template,
};

export default options;
