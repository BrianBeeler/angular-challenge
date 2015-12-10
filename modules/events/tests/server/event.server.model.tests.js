'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TestEvent = mongoose.model('Event');

/**
 * Globals
 */
var user, testEvent;

/**
 * Unit tests
 */
describe('Event Model Unit Tests:', function () {

  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      testEvent = new TestEvent({
        title: 'This is a test event',
        description: 'This is a test event',
        startDate: '2015-12-24T06:00:00.000Z',
        endDate: '2015-12-26T06:00:00.000Z',
        featured: true,
        category: 'Test',
        created: '2015-12-24T06:00:00.000Z',
        updated: '2015-12-24T06:00:00.000Z'
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return testEvent.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without title', function (done) {
      testEvent.title = '';

      return testEvent.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    TestEvent.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});
