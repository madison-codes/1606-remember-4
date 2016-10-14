import Ember from 'ember';

export default Ember.Route.extend({
    // title : '',
    // notes : '',
    // date : '',
    actions: {
      testAction: function() {
        this.store.createRecord('reminder', {
            title: this.title
            // notes: this.notes
          });
      }
    }
  });
