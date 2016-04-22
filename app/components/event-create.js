import 'bootstrap-datepicker/js/bootstrap-datepicker';
$('.datepicker').datepicker();

class EventCreateController
{
  /* @ngInject */
  constructor()
  {
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
  });
