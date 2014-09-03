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
  , definitions: this.definitions(query)
  });
};

Store.prototype.jobs = function (query) {
  query = this.buildQuery(query);
  var jobs = RSVP.denodeify(this.agenda.jobs.bind(this.agenda));
  return jobs(query).then(function (results) {
    return results.map(function (result) {
      result.attrs.jobData = result.attrs.data;
      delete result.attrs.data;
      return result;
    });
  });
};

Store.prototype.meta = function () {
  var hash = {
    total: this.count()
  , completed: this.count({filter: 'completed'})
  , future: this.count({filter: 'future'})
  , failed: this.count({filter: 'failed'})
  };

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

  if (name && 'All' !== name) {
    query.name = name;
  }

  return query;
};

Store.prototype.definitions = function (query) {
  query || (query = {});
  var hash = { all: this.count({filter: query.filter}) };
  var indexMap = {};
  var objects = this.definitionObjects();

  objects.forEach(function (definition) {
    indexMap[definition._id] = objects.indexOf(definition);
    hash[definition._id] = this.count({name: definition.name, filter: query.filter});
  }, this);

  return RSVP.hash(hash).then(function (counts) {
    return Object.keys(counts).map(function (id) {
      var object = objects[indexMap[id]];
      object.count = counts[id];
      return object;
    });
  });
};

Store.prototype.definitionObjects = function () {
  var objects = Object.keys(this.agenda._definitions).map(function (d) {
    var id = slug(d);
    return {
      _id: id
    , name: d
    , sortValue: 0
    };
  });

  objects.push({
    _id: 'all'
  , name: 'All'
  , sortValue: -1
  });

  return objects;
};
