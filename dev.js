var express = require('express');
var Agenda = require('agenda');
var agendaUI = require('./index');

var app = express();

var agenda = new Agenda({db: { address: 'localhost:27017/agenda-ui-development'}});
agenda._db.remove(function () {

  agenda.define('send email', function(job, done) {
    console.log('Delete old users', job.attrs.data);
    setTimeout(done, 1000);
  });

  agenda.define('delete users', function(job, done) {
    console.log('Update users', job.attrs.data);
    setTimeout(done, 3000);
  });

  agenda.define('run analytics', function(job, done) {
    console.log('Send email', job.attrs.data);
    setTimeout(done, 2000);
  });

  agenda.schedule('in 25 seconds', 'send email', {
    to: 'admin@example.com'
  , subject: 'Report'
  });

  agenda.every('18 seconds', 'delete users', {
    inactive: true
  , paying: false
  });

  agenda.every('1 minute', 'run analytics', {
    type: 'engadgemant'
  , email: 'team'
  });

  app.use('/agenda-ui', agendaUI(agenda, {poll: 1000}));

  agenda.start();

  app.listen(3022);
});
