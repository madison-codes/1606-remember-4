import Ember from 'ember';

export default Ember.Route.extend({
    model() {
      return Ember.Object.create()
    },
    actions: {
      addNewReminder: function(model) {
        let controller = this.controllerFor('reminders.new');

        let reminderDate;
        if(model.date) { reminderDate = new Date(model.date) }
        else { reminderDate = new Date() }
        this.store.createRecord('reminder', {
          title: model.title,
          notes: model.notes,
          date: reminderDate
        }).save().then(function() {
          // this --> if moved to controller
          controller.set('model', Ember.Object.create())
        });
      }
    }
  });


  // what is the difference of programing with return vs without (using return is functional programing )
