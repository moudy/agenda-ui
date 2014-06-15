export default Ember.Route.extend({

  model: function () {
    return this.store.find('definition');
  }

, setupController: function (controller, model) {
    controller.set('filter', 'future');
    this._super(controller, model);
  }

});

