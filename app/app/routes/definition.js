import PollJobsRouteMixin from '../mixins/poll-jobs-route';

export default Ember.Route.extend(PollJobsRouteMixin, {

  controllerName: 'index'

, model: function (params) {
    var definition = this.store.getById('definition', params.definition_id);
    var applicationController = this.controllerFor('application');

    applicationController.setProperties({
      currentDefinition: definition
    });

    var filter = applicationController.get('filter');

    return this.store.find('job', {
      name: definition.get('name')
    , filter: filter
    });
  }


});

