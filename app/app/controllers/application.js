export default Ember.Controller.extend({

  isFutureFilter: Ember.computed.equal('filter', 'future')

, isCompleteFilter: Ember.computed.equal('filter', 'completed')

, isFailedFilter: Ember.computed.equal('filter', 'failed')

, definitions: function () {
    return this.store.all('definition');
  }.property()

, actions: {
    setDefinition: function (definition) {
      this.set('currentDefinition', null);

      if (definition) {
        this.transitionToRoute('definition', definition.get('id'));
      } else {
        this.transitionToRoute('index');
      }

      this.set('currentDefinition', definition);
    }

  , setFilter: function (filter) {
      this.set('filter', filter);
    }
  }

});

