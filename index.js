var path = require('path');
var express = require('express');
var ejs = require('ejs');
var api = require('./lib/api');

module.exports = function (agenda, options) {
  options || (options = {});
  if (typeof options.poll === 'undefined') options.poll = 1000;
  var app = express();
  var indexHTML = path.join(__dirname, 'app', 'index.html');

  var router = express.Router();

  router.get('/', function (req, res) {
    var data = {};
    data.namespace = req.originalUrl.replace(/(^\/|\/$)/g, '');
    data.options = options;

    ejs.renderFile(indexHTML, data, function (err, html) {
      res.send(html);
    });
  });

  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.use('/jobs', api(agenda));
  app.use(router);

  return app;

};
