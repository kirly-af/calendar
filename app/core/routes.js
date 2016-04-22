/* @ngInject */
export default function($routeProvider)
{
  let template = (component) => `<${component}></${component}>`;

  $routeProvider
    .otherwise('/calendar')
    .when('/calendar', {template: template('calendar')})
    .when('/eventCreate', {template: template('event-create')});
};
