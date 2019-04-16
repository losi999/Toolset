import angular from 'angular';

import template from './app.component.html';

export class AppController implements angular.IComponentController {
    constructor() { }
}

const options: angular.IComponentOptions = {
    controller: AppController,
    template,
};

export default options;
