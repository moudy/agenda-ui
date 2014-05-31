var express = require('express');
var Agenda = require('agenda');
var agendaUI = require('./index');

var app = express();

var agenda = new Agenda({db: { address: 'localhost:27017/agenda-ui-development'}});
agenda._db.remove(function () {

  agenda.define('delete old users', function(job, done) {
    console.log('Delete old users', job.attrs.data);
    setTimeout(done, 1000);
  });

  agenda.define('update users', function(job, done) {
    console.log('Update users', job.attrs.data);
    setTimeout(done, 3000);
  });

  agenda.define('send email', function(job, done) {
    console.log('Send email', job.attrs.data);
    setTimeout(done, 2000);
  });

  agenda.schedule('in 25 seconds', 'send email', {to: 'admin@example.com'});
  agenda.every('18 seconds', 'delete old users', { userId: 'foo'});
  agenda.every('1 minute', 'update users', { userId: 'bar'});

  app.use('/agenda-ui/assets', require('broccoli-middleware'));
  app.use('/agenda-ui', agendaUI(agenda, {poll: 1000}));

  agenda.start();

  app.listen(3022);
});
