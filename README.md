# Agenda UI

A UI to view [Agenda](https://github.com/rschmukler/agenda) jobs.

![Agenda UI Screenshot](https://raw.githubusercontent.com/moudy/agenda-ui/screenshot/agenda-ui-screenshot.png)


### Install
```
npm install --save agenda-ui
```

### Usage
The Agenda UI is middleware you can mount at a path in your express app.
```js
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


### Todo and Ideas
- pagination
- more human friendly countdown time format
- a way to view a specific job (i.e. /jobs/:jobId)
- run/cancel job
- tests


### Developing
This is an Ember app that gets built on `prepublish`.

To build the app, you will need Bower installed globally (`npm install bower -g`).  After Bower is available, run `npm install` and then `bower install` in the `app/` directory.

To run the application locally with sample jobs, run `npm run dev` and `ember serve` in the `/app` directory, then visit [http://localhost:3022/](http://localhost:3022/).