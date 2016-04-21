import 'jquery';
import 'bootstrap';
import 'angular';

// import 'core/routes';
import Calendar from 'components/calendar';

const dependencies = [

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
