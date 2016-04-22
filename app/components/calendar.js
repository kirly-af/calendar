import 'moment';
import 'fullcalendar';
import 'angular-ui-calendar';

let calendarConfig = {
  calendar: {
    height: 450,
    editable: true,
    header: {
      left: 'month basicWeek basicDay agendaWeek agendaDay',
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

    this.eventSources = [];
    calendarConfig.calendar.dayClick = (ev) => this.showAddEventDialog(ev);
    // eventDrop: $scope.alertOnDrop,
    // eventResize: $scope.alertOnResize
    this.uiConfig = calendarConfig;
  }

  showAddEventDialog(param)
  {
    console.log(param);
  }
}

export default angular.module('calendar', ['ui.calendar'])
  .component('calendar', {
    templateUrl: 'components/calendar.html',
    controller: CalendarController,
    controllerAs: 'vm'
  });
