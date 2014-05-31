# Agenda UI

A UI to view [Agneda](https://github.com/rschmukler/agenda) jobs.

### This is still very much a work in progress
It's better than nothing but still pretty rough. I'm open to suggestions and pull requests.

### Install
```
npm install --save agenda-ui
```

### Usage
The Agenda UI is middleware you can mount at a path in your express app.
```
var express = require('express');
var Agenda = require('agenda');
var agendaUI = require('agenda-ui');

var app = express();
var agenda = new Agenda(...)

app.use('/agenda-ui', agendaUI(agenda, {poll: 1000}));
```

### Documentation
#### agendaUI(agendaInstance, options)
The first argument is the agenda instance. The second is an options object. Currently the only options is `poll`. This sets the interval the app polls for chnages. It can also be set to `false` to not poll at all.


### Screenshot
![Agenda UI Screenshot](https://raw.githubusercontent.com/moudy/agenda-ui/screenshot/agenda-ui-screenshot.png)

### Todo and Ideas
- browse by name, type, etc.
- pagination
- a way to view a specific job
- general UI polish
- better dev workflow
- tests


### Developing
This is an Ember app that gets built on `prepublish`. To try it out locally with some sample jobs run `npm run dev` and go to [http://localhost:3022/agenda-ui](http://localhost:3022/agenda-ui).
