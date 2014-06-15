export default Ember.ArrayController.extend({

  needs: ['application']

, filterBinding: 'controllers.application.filter'

, fetch: function () {
    this.send('updateData');
  }.observes('filter')

});
