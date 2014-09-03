import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(date, object) {
  if (date) {
    var options = object.hash;
    options.format = options.format || 'H:mm:ss, dd MMM Do';
    var formatted = moment.utc(date).format(options.format);
    var ret = '<time title="'+date+'" datetime="'+date+'" class="time">'+formatted+'</time>';
    if (options.prefix) {
      ret = options.prefix + ' ' + ret;
    }
    return new Ember.Handlebars.SafeString('<span class="time-container">'+ret+'</span>');
  }
});

