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
  constructor()
  {
    'ngInject';

    this.events = [event];
    this.eventSources = window.events.map(this.eventToSlots);
    calendarConfig.calendar.eventClick = (ev) => this.eventDetails(ev.id);
    // eventDrop: $scope.alertOnDrop,
    // eventResize: $scope.alertOnResize
    this.uiConfig = calendarConfig;
  }

  eventToSlots(event)
  {
    let slots = [];
    let duration = moment.duration(event.duration, 'minutes');
    let startTime = null;
    let endTime = moment(event.end + ' ' + event.time, 'DD/MM/YYYY LT');
    endTime.add(moment.duration(event.duration * event.slots, 'minutes'));

    for (let nbDay = 0; !endTime.isSame(startTime); ++nbDay)
    {
      if (nbDay > 10)
        break;
      startTime = moment(event.start + ' ' + event.time, 'DD/MM/YYYY LT');
      startTime.add(moment.duration(nbDay, 'days'));
      for (let i = 0; i < event.slots; ++i)
      {
        if (i > 20)
          break;
        slots.push({
          id: event.id,
          title: event.title,
          start: new Date(startTime.toDate()),
          end: new Date(startTime.add(duration).toDate())
        });
      }
    }
    return slots;
  }

  eventDetails(id)
  {
    console.log(id);
  }
}

export default angular.module('calendar', ['ui.calendar'])
  .component('calendar', {
    templateUrl: 'components/calendar.html',
    controller: CalendarController,
    controllerAs: 'vm'
  });
