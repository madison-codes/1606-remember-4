import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editReminder: function() {
      this.toggleProperty('isEditing');
    },

    saveEdited: function(model) {
      let reminder = model.getProperties('title', 'notes', 'date');
      this.get('store').findRecord('reminder', model.id)
      .then(function(activeReminder) {
        activeReminder.setProperties({
          title: reminder.title,
          notes: reminder.notes,
          date: reminder.date || new Date().toDateString()
        });
        activeReminder.save();
      });
      this.toggleProperty('isEditing');
    },

    undoChanges: function(model) {
      this.get('store').findRecord('reminder', model.id)
      .then(function(activeReminder) {
        activeReminder.rollbackAttributes();
      });
      this.toggleProperty('isEditing');
    },

    checkForUnsavedChanges: function(model) {
      this.get('store').findRecord('reminder', model.id)
      .then(function(reminder) {
        if (reminder.currentState.isDirty) {
          reminder.set('unsaved', true)
        }
      })
    }
  }
});
