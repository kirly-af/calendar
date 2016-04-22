import 'jquery';
import 'bootstrap';
import 'angular';
import 'angular-route';
import 'lodash';
import 'restangular';

import routesConfig from './core/routes';
import calendar from './components/calendar';
import eventCreate from './components/event-create';

const dependencies = [
  'ngRoute',
  'restangular',

  calendar.name,
  eventCreate.name
];

angular.module('app', dependencies)
  .config(routesConfig)
  .component('app', {templateUrl: 'core/layout.html'});

function config($locationProvider)
{
  'ngInject';

  $locationProvider.html5Mode(true);
}

angular.element(document).ready(function()
{
  angular.bootstrap(document, ['app']);
});
