var express = require('express');
var Store = require('./store');

module.exports = function (agenda) {
  var router = express.Router();
  var store = new Store(agenda);

  router.get('/jobs', function (req, res) {
    store.data(req.query).then(res.json.bind(res));
  });

  router.get('/definitions', function (req, res) {
    res.json({
      definitions: store.definitions()
    });
  });

  return router;
};
