var Router = Ember.Router.extend({

// TODO - figure out why this doesn't work when mounted on another app
// location: 'auto'

  rootUrl: '/' + Ember.ENV.NAMESPACE + '/'

});

Router.map(function() {
  this.route('jobs', {path: '/:definition_id'});
});

export default Router;
