import Ember from 'ember';

var JobView = Ember.View.extend({

  templateName: 'job'

, classNames: ['panel', 'panel-default']

, classNameBindings: [
    'controller.isFinished'
  , 'controller.isRunning'
  ]

, controllerBinding: 'content'


});

export default JobView;
