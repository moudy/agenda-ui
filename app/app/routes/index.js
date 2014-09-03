import Ember from 'ember';

var POLL_INTERVAL = Ember.ENV.POLL_INTERVAL;

export default Ember.Route.extend({

  activate: function () {
    if (POLL_INTERVAL) {
      this.poll();
    }
  }

, model: function (params) {
    var definitionId = params.definition_id || 'all';
    var definition = this.store.getById('definition', definitionId);
    var applicationController = this.controllerFor('application');
    if (POLL_INTERVAL) {
      applicationController.set('pollInterval', POLL_INTERVAL);
    }

    applicationController.setProperties({
      currentDefinition: definition
    });

    var filter = applicationController.get('filter');

    return this.store.find('job', {
      name: definition.get('name')
    , filter: filter
    });
  }

, poll: function () {
    var applicationController = this.controllerFor('application');
    applicationController.incrementProperty('pollCount');
    Ember.run.later(this, function () {
      this.refresh().then(this.poll.bind(this));
    }, POLL_INTERVAL);
  }

, actions: {
    updateData: function () {
      this.refresh();
    }
  }


});
