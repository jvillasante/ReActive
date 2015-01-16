'use strict';

const
  async = require('async'),
  faker = require('faker'),
  UserProvider = require('../data/userProvider').UserProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  userProvider = new UserProvider(config.connectionStr),
  uuids = require('./uuids').users;

faker.locale = "es";

exports.createUsers = function(callback) {
  let i, users = [];

  for (i = 0; i < 10; i++) {
    if (i === 0) {
      users.push({
        id: uuids[i],
        username: 'foobar',
        email: 'foobar@example.com',
        password: 'secret'
      });
    } else {
      users.push({
        id: uuids[i],
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    }
  }

  userProvider.removeAll(function(err) {
    if (err) { console.log(err); throw err; }

    async.each(users, function(user, cb) {
      userProvider.save(user, function(err, result) {
        cb(err);
      });
    }, function(err) {
      callback(err);
    });
  });
};

