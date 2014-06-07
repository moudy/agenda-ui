var express = require('express');
var slug = require('speakingurl');

module.exports = function (agenda) {
  var router = express.Router();

  function definitions () {
    return Object.keys(agenda._definitions).map(function (d) {
      var id = slug(d);
      return {
        _id: id
      , name: d
      };
    });
  }

  function buildQuery (queryParams) {
    var query = {};
    var filter = queryParams.filter;
    var name = queryParams.name;

    if (!filter || 'future' === filter) {
      query.nextRunAt =  { $gte: new Date() };
    } else if ('completed' === filter) {
      query.lastFinishedAt =  { $exists: true };
      query.type = 'normal';
    } else if ('failed' === filter) {
      query.failedAt =  { $exists: true };
    }

    if (name) {
      query.name = name;
    }

    return query;
  }

  router.get('/jobs', function (req, res) {
    var query = buildQuery(req.query);

    agenda.jobs(query, function(err, jobs) {
      res.json({
        jobs: jobs
      , definitions: definitions()
      });
    });
  });

  router.get('/definitions', function (req, res) {
    res.json({
      definitions: definitions()
    });
  });

  return router;
};
