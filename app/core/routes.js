export default function($routeProvider)
{
  'ngInject';

  let template = (component) => `<${component}></${component}>`;

  $routeProvider
    .otherwise('/calendar')
    .when('/calendar', {template: template('calendar')})
    .when('/event-create', {template: template('event-create')})
    .when('/event-details/:title', {template: template('event-details')});
};
