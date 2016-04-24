class EventDetailsController
{
  constructor($routeParams, API)
  {
    'ngInject';

    this.api = API;
    this.api.getEvent($routeParams.id)
      .then((event) =>
      {
        this.slot = event;
        this.start = moment(this.slot.date, 'DD/MM/YYYY HH:mm A').toDate();
        this.end = moment(this.start)
          .add(moment.duration(this.slot.duration, 'minutes'))
          .toDate();
      });
  }
}

export default angular.module('event-details', [])
  .component('eventDetails', {
    templateUrl: 'components/event-details.html',
    controller: EventDetailsController,
    controllerAs: 'vm'
  });
