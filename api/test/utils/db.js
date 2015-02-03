'use strict';

const
  async = require('async'),
  db = require('../../lib/db'),
  config = require('../../config.json').test,
  UserProvider = require('../../data/userProvider').UserProvider,
  userFixtures  = require('../fixtures/users.json'),
  userProvider = new UserProvider(config.connectionStr);

// empty the database
exports.reset = function(callback) {
  async.parallel([
    function emptyUsersTable(cb) {
      userProvider.removeAll(cb);
    }
  ], callback);
};

// populate the database with fixtures
exports.populate = function(callback) {
  async.each(userFixtures, function(data, next) {
    userProvider.save(data, function(err, result) {
      if (err) { throw err; }
      next();
    });
  }, function(err) {
    if (err) { return callback(err); }
    callback(null);
  });
};

// connect to reset and populate database with fixtures
exports.setupDatabase = function(callback) {
  exports.reset(function(err) {
    if (err) { throw err; }
    exports.populate(callback);
  });
};

exports.endConnection = function(callback) {
  db.disconnect();
  callback();
};
