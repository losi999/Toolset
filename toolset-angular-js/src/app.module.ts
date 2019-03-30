import angular from 'angular';
import 'angular-route';

import authModule from '@/auth/auth.module';
import AppComponent from '@/app.component';
import NavigationBarComponent from '@/navigation-bar/navigation-bar.component';

class AppModule {
    public static $inject = ['$locationProvider'];

    constructor($locationProvider: angular.ILocationProvider) {
        $locationProvider.html5Mode(true);
    }
}

const appModule = angular.module('toolset', [authModule], AppModule);
appModule.component('app', AppComponent);

appModule.component('navigationBar', NavigationBarComponent);
