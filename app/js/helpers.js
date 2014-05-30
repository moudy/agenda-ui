var highlight = require('highlight.js');

Em.Handlebars.helper('json-stringify', function(data, replacer, spacer) {
  return JSON.stringify(data, replacer, spacer);
});

Em.Handlebars.helper('highlight-object', function(object, replacer, spacer) {
  var string = JSON.stringify(object, replacer, spacer);
  string = string.replace(/^\s+|\s+$/g,'');
  string = highlight.highlightAuto(string).value;
  return new Em.Handlebars.SafeString(string);
});

//lastModifiedBy: null
//name: "delete old users"
//nextRunAt: "2014-05-30T12:34:36.482Z"
//priority: 0
//repeatInterval: "3 minutes"
//type: "single"
