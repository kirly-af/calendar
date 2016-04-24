import 'fullcalendar';
import 'angular-ui-calendar';

let calendarConfig = {
  calendar: {
    height: 800,
    editable: false,
    header: {
      left: 'month agendaWeek basicDay',
      center: 'title',
      right: 'today prev,next'
    }
  }
};

class CalendarController
{
  constructor(API)
  {
    'ngInject';

    this.api = API;
    this.eventSources = [];
    this.createEntries()
      .then((eventSource) => this.eventSources.push(eventSource));

    // this.mock();

    calendarConfig.calendar.eventClick = (ev) => this.eventDetails(ev.id);
    this.uiConfig = calendarConfig;
  }

  createEntries()
  {
    return this.api.getAllEvents().then((events) =>
    {
      let eventSource = [];
      for (let item of events)
      {
        let start = moment(item.date, 'DD/MM/YYYY HH:mm A');
        let end = moment(start).add(moment.duration(item.duration, 'minutes'));
        let slot = {
          id: item.key,
          title: `${item.name} - ${item.event.title}`,
          start: start.toDate(),
          end: end.toDate()
        };
        eventSource.push(slot);
      }
      return eventSource;
    });
  }

  eventDetails(id)
  {
    window.location = `#/event-details/${id}`;
  }

  mock()
  {
    let eventSource = [
      {id: 'test', title: 'Test Event', start: new Date(), allDay: false}
    ];
    this.eventSources.push(eventSource);
  }
}

export default angular.module('calendar', ['ui.calendar'])
  .component('calendar', {
    templateUrl: 'components/calendar.html',
    controller: CalendarController,
    controllerAs: 'vm'
  });
