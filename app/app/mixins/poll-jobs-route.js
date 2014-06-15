var POLL_INTERVAL = Ember.ENV.POLL_INTERVAL;

export default Ember.Mixin.create({
  activate: function () {
    if (POLL_INTERVAL) this.poll();
  }

, deactivate: function() {
    clearInterval(this.timer);
  }

, poll: function () {
    this.incrementProperty('pollCount');
    Ember.run.later(this, function () {
      this.refresh().then(this.poll.bind(this));
    }, POLL_INTERVAL);
  }


});
