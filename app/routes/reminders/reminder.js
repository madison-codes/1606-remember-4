import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('reminder', params.reminder_id);
  },
  actions: {
    remove: function(model) {
      model.destroyRecord().then(() => {
        this.transitionTo('reminders');
      });
    }
  }
});
