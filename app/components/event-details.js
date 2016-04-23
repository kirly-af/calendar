class EventDetailsController
{
  constructor($routeParams, API)
  {
    'ngInject';

    API.getEvent($routeParams.title)
      .then((event) => {
        this.event = event;
      });
  }
}

export default angular.module('event-details', [])
  .component('eventDetails', {
    templateUrl: 'components/event-details.html',
    controller: EventDetailsController,
    controllerAs: 'vm'
  });
