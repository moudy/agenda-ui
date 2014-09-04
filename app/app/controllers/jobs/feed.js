import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['jobs']

, queryParams: ['filter', 'job']

, filter: Ember.computed.alias('controllers.jobs.filter')

, job: Ember.computed.alias('controllers.jobs.job')

, meta: function () {
    return this.get('content.meta');
  }.property('content')

, itemController: 'jobs/feed-item'

, sortProperties: [
    'type'
  , 'nextRunAt'
  , 'isFinished'
  ]

, orderBy: function (a, b) {
    var ret = 0;

    if (a.get('isFinished') && b.get('isFinished')) {
      ret = (a.get('lastRunAt') > b.get('lastRunAt')) ? -1 : 1;
    } else if (a.get('isFinished') || b.get('isFinished')) {
      ret = (a.get('isFinished')) ? -1 : 1;
    } else {
      ret = (a.get('nextRunAt') < b.get('nextRunAt')) ? -1 : 1;
    }

    return ret;
  }

});

