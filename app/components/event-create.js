import 'angular-bootstrap-datetimepicker';
import 'angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js';

// NOTE: MOCK
window.events = [
  {
    id: 1,
    title: 'Event 1',
    description: 'This is event 1',
    start: '23/04/2016',
    end: '23/04/2016',
    time: '12:00 PM',
    duration: 15,
    slots: 10
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'This is event 2',
    start: '21/04/2016',
    end: '22/04/2016',
    time: '10:00 AM',
    duration: 30,
    slots: 10
  }
];

class EventCreateController
{
  constructor()
  {
    'ngInject';
  }

  createEvent()
  {
    let event = {
      id: window.events.slice(-1)[0].id + 1,
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
      window.events.push(event);
      window.location.href = '#/calendar';
    }
  }
}

export default angular.module('event-create', ['ui.bootstrap.datetimepicker'])
  .component('eventCreate', {
    templateUrl: 'components/event-create.html',
    controller: EventCreateController,
    controllerAs: 'vm'
  });
