import angular from 'angular';

import template from '@/app.component.html';

class AppController implements angular.IComponentController {
    constructor() { }
}

const options: angular.IComponentOptions = {
    controller: AppController,
    template,
};

export default options;
