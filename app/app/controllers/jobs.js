import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['jobs/feed']

, filter: 'future'

, job: 'all'

, meta: function () {
    return this.store.metadataFor('job');
  }.property('controllers.jobs/feed.content', 'filter', 'job')

, sortedDefinitions: function () {
    return this.get('definitions').sortBy('sortValue', 'id');
  }.property('definitions')

});
