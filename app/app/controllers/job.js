import Ember from 'ember';

var PRIORITY_MAP = {
  '20': 'highest'
, '10': 'high'
, '0': 'default'
, '-10': 'low'
, '-20': 'lowest'
};

var JobController = Ember.ObjectController.extend({

  nextRunAtFromNow: function () {
    var next = moment.utc(this.get('nextRunAt'));
    var now = moment.utc();
    var diff = next.diff(now);
    var ret = Math.floor(diff / 1000);
    if (ret < 0) {
      ret = 0;
    }
    return ret;
  }.property('clock.second')

, priorityHuman: function () {
    return PRIORITY_MAP[this.get('priority')];
  }.property('priority')

, isRunning: Ember.computed.bool('lockedAt')

, actions: {
    toggleDataExpand: function () {
      this.toggleProperty('dataExpanded');
    }

  , toggleDetailsExpand: function () {
      this.toggleProperty('detailsExpanded');
    }
  }


});

export default JobController;
