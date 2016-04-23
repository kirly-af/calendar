import 'restangular';

function config(RestangularProvider)
{
  'ngInject';

  RestangularProvider.setBaseUrl('/api');
}

class ApiService
{
  constructor(Restangular)
  {
    'ngInject';
    this.Restangular = Restangular;
  }

  getAllEvents()
  {
    return this.Restangular.one('events').get()
      .then((res) => res.Items);
  }

  getEvent(title)
  {
    return this.Restangular.one('events', title).get()
      .then((res) => res.Item);
  }

  createEvent(event)
  {
    return this.Restangular.all('events').post(event);
  }
}

export default angular.module('app.api', ['restangular'])
  .config(config)
  .service('API', ApiService);
