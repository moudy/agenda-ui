export default Ember.Component.extend({

  tagName: 'a'

, classNames: ['nav-link', 'btn']

, classNameBindings: ['isActive']

, isActive: function () {
    return this.get('currentDefinitionId') === this.get('model.id');
  }.property('currentDefinitionId')

, click: function () {
    this.sendAction('action', this.get('model'));
  }

});
