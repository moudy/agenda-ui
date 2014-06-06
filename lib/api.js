var express = require('express');

module.exports = function (agenda) {
  var router = express.Router();

  router.get('/', function (req, res) {
    var find = { nextRunAt: { $gte: new Date() } };

    agenda.jobs(find, function(err, jobs) {
      res.json({jobs: jobs});
    });
  });

  return router;
};
