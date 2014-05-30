var moment = require('moment');

App.JobController = Em.ObjectController.extend({
  nextRunAtFromNow: function () {
    var next = moment.utc(this.get('nextRunAt'));
    var now = moment.utc();
    var diff = next.diff(now);
    return Math.floor(diff / 1000);
  }.property('clock.second')
});

