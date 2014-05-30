global.Handlebars = require('handlebars');
global.jQuery = global.$ = require('jquery');

require('./vendor/ember');
require('./vendor/ember-data');

global.App = Em.Application.create({
  ready: function() {
    this.register('clock:clock', App.Clock, {singleton: true});
    this.inject('controller', 'clock', 'clock:clock');
  }
});

DS.RESTAdapter.reopen({
  namespace: global.ENV.namespace
});

App.ApplicationSerializer = DS.JSONSerializer.extend({
  primaryKey: '_id'
});

require('./helpers');
require('./clock');
require('./routes');
require('./models/job');
require('./controllers/jobs');
require('./controllers/job');
require('./views/jobs');
require('./views/job');
