import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addNewReminder: function(model) {
      let modelDate;

      if(model.date) { modelDate = new Date(model.date); }
      else { modelDate = new Date(); }

      this.store.createRecord('reminder', {
        title: model.title,
        notes: model.notes,
        date: modelDate
      })
      .save()
      .then(function(){
        model.setProperties({ title: '', date: '', notes: '' });
     });
    }
  }
});
