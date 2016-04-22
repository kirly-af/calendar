import 'bootstrap-datepicker/js/bootstrap-datepicker';

class EventCreateController
{
  constructor()
  {
    'ngInject';
  }

  createEvent()
  {
    console.log('creating event');
  }
}

export default angular.module('event-create', [])
  .component('eventCreate', {
    templateUrl: 'components/event-create.html',
    controller: EventCreateController,
    controllerAs: 'vm'
  })
  .run(() => angular.element('.datepicker').datepicker());
