import 'jquery';
import 'bootstrap';
import 'angular';
import 'angular-route';

import routesConfig from 'core/routes';
import calendar from 'components/calendar';

const dependencies = [
  'ngRoute',

  // Routes.name,
  calendar.name
];

angular.module('app', dependencies)
  .config(routesConfig)
  .component('app', {templateUrl: 'core/layout.html'});

/* @ngInject */
function config($locationProvider)
{
  $locationProvider.html5Mode(false);
}

angular.element(document).ready(function()
{
  angular.bootstrap(document, ['app']);
});
