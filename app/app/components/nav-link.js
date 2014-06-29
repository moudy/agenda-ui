export default Ember.Component.extend({

  tagName: 'li'

, classNameBindings: ['isActive:active']

, isActive: function () {
    return this.get('currentDefinitionId') === this.get('model.id');
  }.property('currentDefinitionId')

, click: function () {
    this.sendAction('action', this.get('model'));
  }

});
