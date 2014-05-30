var attr = DS.attr;

App.Job = DS.Model.extend({
  name: attr('string')
, data: attr()
, nextRunAt: attr('date')
});

