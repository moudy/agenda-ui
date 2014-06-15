var RSVP = require('rsvp');
var slug = require('speakingurl');

var Store = module.exports = function (agenda) {
  this.agenda = agenda;
  this.db = agenda._db;
};

Store.prototype.data = function (query) {
  return RSVP.hash({
    jobs: this.jobs(query)
  , meta: this.meta()
  , definitions: this.definitions()
  });
};

Store.prototype.jobs = function (query) {
  query = this.buildQuery(query);
  var jobs = RSVP.denodeify(this.agenda.jobs.bind(this.agenda));
  return jobs(query);
};

Store.prototype.meta = function () {
  var hash = {
    total: this.count()
  , completed: this.count({filter: 'completed'})
  , future: this.count({filter: 'future'})
  , failed: this.count({filter: 'failed'})
  };

  this.definitions().forEach(function (definition) {
    hash[definition._id] = this.count({name: definition.name});
  }, this);

  return RSVP.hash(hash);
};

Store.prototype.count = function (options) {
  var count = RSVP.denodeify(this.db.count.bind(this.db));
  return count(this.buildQuery(options));
};

Store.prototype.buildQuery = function (queryParams) {
  queryParams || (queryParams = {});
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
};

Store.prototype.definitions = function () {
  return Object.keys(this.agenda._definitions).map(function (d) {
    var id = slug(d);
    return {
      _id: id
    , name: d
    };
  });
};
