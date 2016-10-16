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
    assert.equal(currentURL(), '/1');
    assert.equal(Ember.$('.spec-reminder-title:first').text().trim(), Ember.$('.clicked-reminder .reminder-title').text().trim());
  });
});

test('clicking new', function(assert) {
  click('.go-to-create-new');
  andThen(function() {
    assert.equal(currentURL(), '/new');
  });
});
