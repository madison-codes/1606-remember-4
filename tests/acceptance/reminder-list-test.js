/* globals server */

import { test, skip } from 'qunit';
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
    // assert.equal(currentURL(), '/1');
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

skip('add input title to reminder', function(assert) {
  visit ('/new');
  fillIn('.title-input', 'test');
  click('.add-new-reminder');
  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title').text().trim(),('test'));
  });
});

skip('add input date to reminder', function(assert) {
  visit ('/new');
  fillIn('.date-input', '2016-10-16');
  click('.add-new-reminder');
  andThen(function() {
    assert.equal(Ember.$('.reminder-date').text().trim(),('2016-10-16'));
  });
});


skip('routes to new item when clicked' , function(assert) {
  assert.equal(currentURL(), '/6');
  click('.add-new-reminder');
  assert.equal(Ember.$('.spec-reminder-title:last').text().trim(), Ember.$('.clicked-reminder').text().trim());
});

// skip('allows you to edit item', function(assert) {

// });
