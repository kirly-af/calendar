/* @ngInject */
export default function($routeProvider)
{
  let template = (component) => `<${component}></${component}>`;

  $routeProvider
    .otherwise('/event-create')
    .when('/calendar', {template: template('calendar')})
    .when('/event-create', {template: template('event-create')});
};
