var path = require('path');
var ejs = require('ejs');
var api = require('./lib/api');

module.exports = function (agenda, options) {
  options || (options = {
    app: require('express')()
  });
  
  if (typeof options.app === 'undefined' ) {
    options.app = require('express')();
  }
  
  if (typeof options.poll === 'undefined') {
    options.POLL_INTERVAL = 1000;
  } else {
    options.POLL_INTERVAL = options.poll;
  }

  var app = options.app;
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
