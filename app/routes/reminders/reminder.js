import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    console.log('testing route')
    console.log(params);
    return this.get('store').find('reminder', params.reminder.id);
  }
});
