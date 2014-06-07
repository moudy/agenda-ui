var Router = Ember.Router.extend({

  //location: 'auto'

  rootUrl: '/' + Ember.ENV.NAMESPACE + '/'

});

Router.map(function() {
  this.route('definition', {path: '/:definition_id'});
});

export default Router;
