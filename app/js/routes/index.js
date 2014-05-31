var POLL_INTERVAL = global.ENV.options.poll;

App.IndexRoute = Em.Route.extend({

  activate: function () {
    if (POLL_INTERVAL) {
      this.timer = setInterval(this.onPoll.bind(this), POLL_INTERVAL);
    }
  }

, model: function () {
    return this.store.find('job');
  }

, onPoll: function () {
    this.model();
  }

, deactivate: function() {
    clearInterval(this.timer);
  }

});
