var moment = require('moment');

App.JobController = Em.ObjectController.extend({
  nextRunAtFromNow: function () {
    var next = moment.utc(this.get('nextRunAt'));
    var now = moment.utc();
    var diff = next.diff(now);
    var ret = Math.floor(diff / 1000);
    if (ret < 0) ret = 0;
    return ret;
  }.property('clock.second')

, isRunning: Em.computed.bool('lockedAt')

, actions: {
    toggleDataExpand: function () {
      this.toggleProperty('dataExpanded');
    }

  , toggleDetailsExpand: function () {
      this.toggleProperty('detailsExpanded');
    }
  }

});


