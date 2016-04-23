import 'angular-bootstrap-datetimepicker';
import 'angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js';

class EventCreateController
{
  constructor(API)
  {
    'ngInject';

    this.api = API;
  }

  createEvent()
  {
    let event = {
      title: this.title,
      description: this.description,
      start: moment(this.start).format('DD/MM/YYYY'),
      end: moment(this.end).format('DD/MM/YYYY'),
      time: moment(this.start).format('HH:mm A'),
      duration: Number(this.duration),
      slots: Number(this.slots)
    };

    if (moment(event.start, 'L').toDate() > moment(event.end, 'L').toDate())
      this.dateInvalid = true;
    else
    {
      this.api.createEvent(event);
      window.location = '#/calendar';
    }
  }
}

export default angular.module('event-create', ['ui.bootstrap.datetimepicker'])
  .component('eventCreate', {
    templateUrl: 'components/event-create.html',
    controller: EventCreateController,
    controllerAs: 'vm'
  });
