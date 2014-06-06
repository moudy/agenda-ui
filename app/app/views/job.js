var JobView = Ember.View.extend({

  templateName: 'job'

, classNames: 'job-card'

, classNameBindings: [
    'controller.isFinished'
  , 'controller.isRunning'
  ]

, controllerBinding: 'content'


});

export default JobView;
