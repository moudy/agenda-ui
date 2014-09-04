import Ember from 'ember';

var JobsView = Ember.CollectionView.extend({

  tagName: 'ul'

, itemViewClass: 'job'

, contentBinding: 'controller'

});

export default JobsView;
