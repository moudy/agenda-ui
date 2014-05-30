var path = require('path');
var express = require('express');
var ejs = require('ejs');
var api = require('./lib/api');

module.exports = function (agenda) {

  var app = express();
  var indexHTML = path.join(__dirname, 'app', 'index.html');

  var router = express.Router();

  router.get('/', function (req, res) {
    var data = {};
    data.namespace = req.originalUrl.replace(/(^\/|\/$)/g, '');

    ejs.renderFile(indexHTML, data, function (err, html) {
      res.send(html);
    });
  });

  app.use('/jobs', api(agenda));
  app.use(router);

  return app;

};
