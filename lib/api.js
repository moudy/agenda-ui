var express = require('express');

module.exports = function (agenda) {
  var router = express.Router();

  router.get('/', function (req, res) {
    agenda.jobs({}, function(err, jobs) {
      res.json(jobs);
    });
  });

  return router;
};
