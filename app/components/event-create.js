import 'bootstrap-datetimepicker';

// NOTE: MOCK
window.events = [
  {
    id: 1,
    title: 'Event 1',
    description: "This is event 1",
    start: '23/04/2016',
    end: '23/04/2016',
    time: '12:00 PM',
    duration: 15,
    slots: 10
  },
  {
    id: 2,
    title: 'Event 2',
    description: "This is event 2",
    start: '21/04/2016',
    end: '22/04/2016',
    time: '10:00 AM',
    duration: 30,
    slots: 10
  },
];

class EventCreateController
{
  constructor()
  {
    'ngInject';
  }

  createEvent()
  {
    // NOTE: MOCK
    window.events.push({
      id: window.events.slice(-1)[0].id + 1,
      title: this.title,
      description: this.description,
      start: this.start,
      end: this.end,
      time: this.time,
      duration: this.duration,
      slots: this.slots
    });
  }
}

export default angular.module('event-create', [])
  .component('eventCreate', {
    templateUrl: 'components/event-create.html',
    controller: EventCreateController,
    controllerAs: 'vm'
  })
