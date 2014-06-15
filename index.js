var path = require('path');
var express = require('express');
var ejs = require('ejs');
var api = require('./lib/api');

module.exports = function (agenda, options) {
  options || (options = {});
  if (typeof options.poll === 'undefined') {
    options.POLL_INTERVAL = 1000;
  } else {
    options.POLL_INTERVAL = options.poll;
  }

  var app = express();
  var indexHTML = path.join(__dirname, 'lib', 'index.html');

  var router = express.Router();

  router.get('/:definitionId?', function (req, res) {
    var data = {};

    options.NAMESPACE = req.originalUrl.replace(/(^\/|\/$)/g, '');

    if(options.ASSET_HOST) {
      options.ASSETS_NAMESPACE = options.ASSET_HOST + '/' + options.NAMESPACE;
    } else {
      options.ASSETS_NAMESPACE = '/' + options.NAMESPACE;
    }

    data.options = options;

    ejs.renderFile(indexHTML, data, function (err, html) {
      res.send(html);
    });
  });

  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.use(api(agenda));
  app.use(router);

  return app;

};
