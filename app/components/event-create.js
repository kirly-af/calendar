class EventCreateController
{
  /* @ngInject */
  constructor()
  {
  }
}

export default angular.module('event-create', [])
  .component('eventCreate', {
    templateUrl: 'components/event-create.html',
    controller: EventCreateController,
    controllerAs: 'vm'
  });