import { moduleFor, test } from 'ember-qunit';

moduleFor('route:new', 'Unit | Route | new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});


skip('fill in from', function(assert) {
  visit('/new');

  fillIn('.title-input', 'Reminder 1');
  fillIn('.notes-input', 'Notes 1');
  fillIn('.date-input', 'Date 1');

});
