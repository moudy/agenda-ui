import Ember from 'ember';

export default Ember.ObjectController.extend({

  queryParams: ['filter', 'job']

, filter: 'future'

, job: 'all'

, pollCount: 0

, meta: function () {
    return this.store.metadataFor('job');
  }.property('job', 'filter', 'jobs')

});
