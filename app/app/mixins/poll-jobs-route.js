var POLL_INTERVAL = Ember.ENV.POLL_INTERVAL;

export default Ember.Mixin.create({
  activate: function () {
    if (POLL_INTERVAL) {
      this.timer = setInterval(this.refresh.bind(this), POLL_INTERVAL);
    }
  }

, deactivate: function() {
    clearInterval(this.timer);
  }

, actions: {
    updateJobs: function () {
      this.refresh();
    }
  }


});
