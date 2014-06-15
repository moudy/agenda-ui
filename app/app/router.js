var Router = Ember.Router.extend({

  //location: 'auto'

  rootUrl: '/' + Ember.ENV.NAMESPACE + '/'

});

Router.map(function() {
  this.route('index', {path: '/:definition_id'});
});

export default Router;
