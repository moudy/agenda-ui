import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.find('definition');
  }

, setupController: function (controller, model) {
    controller.set('definitions', model);
  }

});
