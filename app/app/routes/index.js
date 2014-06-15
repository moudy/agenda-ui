import PollJobsRouteMixin from '../mixins/poll-jobs-route';

export default Ember.Route.extend(PollJobsRouteMixin, {

  model: function (params) {
    var definitionId = params.definition_id || 'all';
    var definition = this.store.getById('definition', definitionId);
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
