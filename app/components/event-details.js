class EventDetailsController
{
  constructor($routeParams, API)
  {
    'ngInject';

    this.api = API;
    this.api.getEvent($routeParams.title)
      .then((event) =>
      {
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
