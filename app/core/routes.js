/* @ngInject */
let routesConfig = function($stateProvider, $urlRouterProvider)
{
  let createRoute = (name) => $stateProvider.state({
    name,
    url: `/${name}`,
    template: `<${name}></${name}>`
  });

  $urlRouterProvider.otherwise('/calendar');
  createRoute('calendar');
};

export default angular.module('app.routes', [])
  .config(routesConfig);
