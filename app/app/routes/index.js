import Ember from 'ember';

var POLL_INTERVAL = Ember.ENV.POLL_INTERVAL;

export default Ember.Route.extend({

  activate: function () {
    Ember.run.cancel(this.timer);
    if (POLL_INTERVAL) {
      this.poll();
    }
  }

, queryParams: {
    filter: {
      refreshModel: true
    }
  , job: {
      refreshModel: true
    }
  }

, model: function (params) {
    var definition = this.store.getById('definition', params.job);

    var query = {
      filter: params.filter
    , name: definition.get('name')
    };

    return Ember.RSVP.hash({
      definitions: this.store.all('definition').sortBy('sortValue', 'id')
    , jobs: this.store.find('job', query)
    });
  }

, poll: function () {
    this.timer = Ember.run.later(this, function () {
      console.log('polling');
      this.refresh().then(this.poll.bind(this));
    }, POLL_INTERVAL);
  }

});
