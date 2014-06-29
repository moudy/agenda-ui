var express = require('express');
var Agenda = require('agenda');
var agendaUI = require('./index');

var app = express();

var agenda = new Agenda({db: { address: 'localhost:27017/agenda-ui-development'}});
agenda._db.remove(function () {

  agenda.define('Send Email', {priority: 'highest'}, function(job, done) {
    console.log('Send Email', job.attrs.data);
    setTimeout(done, 1000);
  });

  agenda.define('Delete Users', function(job, done) {
    console.log('Delete users', job.attrs.data);
    setTimeout(done.bind(null, new Error('Error deleting users')), 3000);
  });

  agenda.define('Run Analytics', function(job, done) {
    console.log('Run Analytics', job.attrs.data);
    setTimeout(done, 2000);
  });

  agenda.schedule('in 25 seconds', 'Send Email', {
    to: 'admin@example.com'
  , subject: 'Report'
  });

  agenda.every('18 seconds', 'Delete Users', {
    inactive: true
  , paying: false
  });

  agenda.every('1 minute', 'Run Analytics', {
    type: 'engagement'
  , email: 'team'
  });

  app.use('/', agendaUI(agenda, {
    poll: false
  , ASSET_HOST: '//localhost:4200'
  }));

  agenda.start();

  app.listen(3022);
});
