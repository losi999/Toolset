import angular from 'angular';

import template from './navigation-bar.component.html';

class NavigationBarController implements angular.IComponentController {
    constructor() { }
}

const options: angular.IComponentOptions = {
    controller: NavigationBarController,
    template,
};

export default options;
