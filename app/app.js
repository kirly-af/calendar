import 'jquery';
import 'bootstrap';
import 'angular';
import 'angular-route';
import 'lodash';

import routesConfig from './core/routes';
import API from './core/api';
import calendar from './components/calendar';
import eventCreate from './components/event-create';
import eventDetails from './components/event-details';

const dependencies = [
  'ngRoute',

  API.name,
  calendar.name,
  eventCreate.name,
  eventDetails.name
];

angular.module('app', dependencies)
  .config(routesConfig)
  .component('app', {templateUrl: 'core/layout.html'});

angular.element(document).ready(function()
{
  angular.bootstrap(document, ['app']);
});
