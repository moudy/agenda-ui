export default Ember.Controller.extend({

  isFutureFilter: Ember.computed.equal('filter', 'future')

, isCompleteFilter: Ember.computed.equal('filter', 'completed')

, isFailedFilter: Ember.computed.equal('filter', 'failed')

, meta: function () {
    return Ember.copy(this.store.metadataFor('job'));
  }.property('currentDefinition', 'filter')

, definitions: function () {
    var definitions = this.store.all('definition');
    return definitions.sortBy('sortValue', 'count', 'id');
  }.property()

, actions: {
    setDefinition: function (definition) {
      this.set('currentDefinition', null);

      if (definition) {
        this.transitionToRoute('index', definition.get('id'));
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

