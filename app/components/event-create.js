import 'angular-bootstrap-datetimepicker';
import 'angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js';

class EventCreateController
{
  constructor(API)
  {
    'ngInject';

    this.api = API;
    this.error = false;
    this.step = 1;
    this.slot = {};

    // this.mock();
  }

  createSlot()
  {
    let date = this.slot.date.label + ' ';
    date += moment(this.slot.time).format('HH:mm A');

    let event = {
      key: `${this.title}/${this.slot.name}`,
      event: {
        title: this.title,
        description: this.description,
        start: this.start,
        end: this.end
      },
      name: this.slot.name,
      date,
      duration: Number(this.duration)
    };
    this.api.createEvent(event);
    this.nextStep();
  }

  generateDates()
  {
    if (!this.start || !this.end)
    {
      this.error = 'Start date and end date are required.';
      return;
    }

    let date = moment(this.start);
    let endDate = moment(this.end);
    this.datesList = [];
    for (let i = 0; !date.isAfter(endDate); ++i)
    {
      this.datesList.push({
        id: i,
        label: date.format('DD/MM/YYYY')
      });
      date.add(1, 'days');
    }

    if (this.datesList.length === 0)
      this.error = 'End date should be after start date.';
    else
    {
      this.slot.date = this.datesList[0];
      this.nextStep();
    }
  }

  nextStep()
  {
    this.step += 1;
  }

  prevStep()
  {
    this.error = false;
    this.step -= 1;
  }

  mock()
  {
    this.title = 'test';
    this.description = 'decription';

    this.step = 2;

    this.duration = 10;
    this.datesList = [
      {
        id: 0,
        date: '05/04/2016'
      },
      {
        id: 1,
        date: '06/04/2016'
      },
      {
        id: 2,
        date: '07/04/2016'
      }
    ];
  }
}

export default angular.module('event-create', ['ui.bootstrap.datetimepicker'])
  .component('eventCreate', {
    templateUrl: 'components/event-create.html',
    controller: EventCreateController,
    controllerAs: 'vm'
  });
