import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addNewReminder: function(model) {
      this.store.createRecord('reminder', {
        title: model.title,
        notes: model.notes,
        date: model.date || new Date()
      })
      .save()
      .then(function(){
        model.setProperties({ title: '', date: '', notes: '' });
     });
    }
  }
});
