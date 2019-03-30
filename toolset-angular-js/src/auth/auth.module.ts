import angular from 'angular';

import LoginComponent from '@/auth/login/login.component';
import RegistrationComponent from '@/auth/registration/registration.component';

class AuthModule {
    public static $inject = ['$routeProvider'];

    constructor($routeProvider: angular.route.IRouteProvider) {
        $routeProvider
            .when('/login', {
                template: '<login></login>',
            })
            .when('/registration', {
                template: '<registration></registration>',
            });
    }
}

const moduleName = 'authModule';
const authModule = angular.module(moduleName, ['ngRoute'], AuthModule);

authModule.component('login', LoginComponent);
authModule.component('registration', RegistrationComponent);

export default moduleName;
