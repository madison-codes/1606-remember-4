import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editReminder: function() {
      this.toggleProperty('isEditing');
      return false;
    },

    saveEdited: function(model) {
      this.store.createRecord('reminder', {
        title: model.title,
        notes: model.notes,
        date: model.date || new Date()
      })
      .save();
    }
  }
});
