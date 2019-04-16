import angular from 'angular';
import 'angular-mocks';
import { AppController } from './app.component';
import authModule from './auth/auth.module';

describe('App component', () => {
    let controller: AppController;

    beforeEach(angular.mock.module('toolset', [authModule]));

    beforeEach(inject(($componentController: angular.IComponentControllerService) => {
        console.log('componentcontroller', $componentController);
        controller = $componentController('app', {});
    }));

    it('should initialize', () => {
        expect(controller).toBeTruthy();
    });
});
