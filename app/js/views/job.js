App.JobView = Em.View.extend({
  templateName: 'job'

, classNames: 'job-card'

, classNameBindings: [
    'controller.isFinished'
  , 'controller.isRunning'
  ]

, controllerBinding: 'content'

});

