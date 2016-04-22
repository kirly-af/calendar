import 'jquery';
import 'bootstrap';
import 'angular';
import 'angular-ui-router';

// import 'core/routes';
import Routes from 'core/routes';
import Calendar from 'components/calendar';

const dependencies = [
  'ui.router',

  Routes.name,
  Calendar.name
];
angular.module('app', dependencies)
  .config(config)
  .component('app', {templateUrl: 'core/layout.html'});

/* @ngInject */
function config($locationProvider)
{
  $locationProvider.html5Mode(true);
}

angular.element(document).ready(function()
{
  angular.bootstrap(document, ['app']);
});
