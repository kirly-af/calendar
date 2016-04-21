import 'jquery';
import 'angular';
import 'moment';
import 'fullcalendar';
import 'angular-ui-calendar';

/* @ngInject */
function config($locationProvider)
{
  $locationProvider.html5Mode(true);
}

const modules = [
  'ui.calendar'
];

/* @ngInject */
let AppController = function() {
  this.eventSources = [];
  this.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      header:{
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      }
      // },
      // dayClick: $scope.alertEventOnClick,
      // eventDrop: $scope.alertOnDrop,
      // eventResize: $scope.alertOnResize
    }
  };
};

angular.module('app', modules)
  .config(config)
  .value('$routerRootComponent', 'app')
  .component('app', {
    templateUrl: 'app.html',
    controller: AppController,
    controllerAs: 'vm'
    // $routeConfig: routeConfig
  });

angular.element(document).ready(function()
{
  angular.bootstrap(document, ['app']);
});
