var JobsController = Ember.ArrayController.extend({

  itemController: 'job'

, sortProperties: [
    'type'
  , 'nextRunAt'
  , 'isFinished'
  ]

, orderBy: function (a, b) {
    var ret = 0;

    if (a.get('isFinished') && b.get('isFinished')) {
      ret = (a.get('lastRunAt') > b.get('lastRunAt')) ? -1 : 1;
    } else if (a.get('isFinished') || b.get('isFinished')) {
      ret = (a.get('isFinished')) ? -1 : 1;
    } else {
      ret = (a.get('nextRunAt') < b.get('nextRunAt')) ? -1 : 1;
    }

    return ret;
  }

});

export default JobsController;
