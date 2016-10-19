/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list', {
  beforeEach() {
    server.createList('reminder', 5);
    visit('/');
  },
  afterEach() {
    server.shutdown();
  }
});

test('viewing the homepage', function(assert) {
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });
});

test('clicking on an individual item', function(assert) {
  click('.spec-reminder-item:first');
  andThen(function() {
    let expected = Ember.$('.spec-reminder-title:first').text().trim();
    let result = Ember.$('.active-reminder-title').text().trim();
    assert.equal(expected, result);
  });
});

test('click new', function(assert) {
  click('.go-to-create-new');
  andThen(function() {
    assert.equal(currentURL(), '/new');
  });
});

test('should add new reminder', function(assert){
  visit('/new');
  click('.add-new-reminder-button');
  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item').length, 6);
  });
});

test('title input matches new reminder title', function(assert) {
  visit ('/new');
  fillIn('.title-input', 'test');
  click('.add-new-reminder-button');
  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title:last').text().trim(),('test'));
  });
});

test('date input matches new reminder date', function(assert) {
  visit ('/new');
  fillIn('.date-input', '2016-10-16');
  click('.add-new-reminder-button');
  andThen(function() {
    assert.equal(Ember.$('.reminder-date:last').text().trim(),('2016-10-16'));
  });
});


test('routes to specific reminder when clicked' , function(assert) {
  click('.spec-reminder-item:first');
  andThen(function() {
    assert.equal(currentURL(), '/1');
  });
});

test('reminder title can be edited and saved', function(assert) {
  visit('/1');
  click('.edit-reminder');
  fillIn('.edit-title-input', 'Testing title edit functionality');
  click('.edit-reminder-save--submit');
  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title:first').text().trim(), ('Testing title edit functionality'));
  });
});

test('reminder notes can be edited and saved', function(assert) {
  visit('/5');
  click('.edit-reminder');
  fillIn('.edit-notes-input', 'Testing notes edit functionality');
  click('.edit-reminder-save--submit');
  andThen(function() {
    assert.equal(Ember.$('.active-reminder-notes').text().trim(), ('Testing notes edit functionality'));
  });
});

test('reminder dates can be edited and saved', function(assert) {
  visit('/5');
  click('.edit-reminder');
  fillIn('.edit-date-input', '2016-10-18');
  click('.edit-reminder-save--submit');
  andThen(function() {
    assert.equal(Ember.$('.reminder-date:last').text().trim(), ('2016-10-18'));
  });
});

test('revert button undoes unsaved changes to fields', function(assert) {
  visit('/1');
  click('.edit-reminder');
  fillIn('.edit-title-input', 'Testing Revert Button');
  click('.edit-reminder-save--submit');
  click('.edit-reminder');
  fillIn('.edit-title-input', 'this wont show up');
  click('.revert-button');
  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title:first').text().trim(), ('Testing Revert Button'));
  });
});

test('reminders with unsaved changes have visual indicator', function(assert) {
  visit('/1');
  click('.edit-reminder');
  fillIn('.edit-title-input', 'Testing');
  click('.done-editing-button');
  andThen(function() {
    assert.ok('.unsaved');
  });
});

test('remove reminder button deletes target reminder', function(assert) {
  visit('/1');
  click('.remove-reminder');
  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item').length, 4);
  });
});

test('remove reminder onclick of remove button in reminder list', function(assert) {
  visit('/1');
  click('.remove-reminder-from-list');
  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item').length, 4);
  });
});
