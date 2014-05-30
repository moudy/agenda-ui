var express = require('express');
var Agenda = require('agenda');
var agendaUI = require('./index');

var app = express();

var agenda = new Agenda({db: { address: 'localhost:27017/agenda-ui-development'}});
agenda.define('delete old users', function(job) { console.log('Delete old users', job); });
agenda.define('update users', function(job) { console.log('Update users', job); });

agenda.every('20 seconds', 'delete old users', { userId: 'foo'});
agenda.every('1 minute', 'update users', { userId: 'bar'});

app.use('/agenda-ui/assets', require('broccoli-middleware'));
app.use('/agenda-ui', agendaUI(agenda));

agenda.start();

app.listen(3022);
