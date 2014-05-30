var env = {};
env[process.env.NODE_ENV] = true;

// Plugins
var mergeTrees = require('broccoli-merge-trees');
var uglifyJS = require('broccoli-uglify-js');
var sass = require('broccoli-sass');
var browserify = require('broccoli-browserify');
var cleanCSS = require('broccoli-clean-css');
var emberTemplateCompiler = require('ember-template-compiler');
var templateBuilder = require('broccoli-template-builder');

// Asset trees
var css = 'app/css';
var js = 'app/js';
var templates = 'app/templates';

// Output tree and files
var outputTree = [];
var APP_JS = 'app.js';
var APP_CSS = 'app.css';
var TEMPLATES = 'templates.js';

templates = templateBuilder(templates, {
  extensions: ['hbs']
, outputFile: TEMPLATES
, namespace: 'Ember.TEMPLATES'
, compile: function (string) {
    return 'Ember.Handlebars.template('+emberTemplateCompiler.precompile(string)+')';
  }
});

var appCss = sass([css], 'app.scss', APP_CSS);

var appJs = browserify(js, {
  entries: ['./app.js']
, outputFile: APP_JS
, bundle: {debug: !env.production}
});

if (env.production) {
  appJs = uglifyJS(appJs);
  appCss = cleanCSS(appCss);
}

outputTree.push(appCss);
outputTree.push(appJs);
outputTree.push(templates);

module.exports = mergeTrees(outputTree, {overwrite: true});
