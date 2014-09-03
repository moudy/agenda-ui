import Ember from 'ember';

 export default Ember.Handlebars.makeBoundHelper(function(object, replacer, spacer){
  var string = JSON.stringify(object, replacer, spacer);
  string = string.replace(/^\s+|\s+$/g,'');
  string = hljs.highlightAuto(string).value;
  return new Ember.Handlebars.SafeString(string);
 });
