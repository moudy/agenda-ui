var attr = DS.attr;

App.Job = DS.Model.extend({
  name: attr('string')
, data: attr()
, nextRunAt: attr('date')
, lastRunAt: attr('date')
, lockedAt: attr('date')
, type: attr('string')

, isFinished: function () {
    return this.get('lastRunAt') && this.get('type') === 'normal';
  }.property('lastRunAt')

});

