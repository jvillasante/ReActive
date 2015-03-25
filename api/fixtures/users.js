'use strict';

const
  async = require('async'),
  UserProvider = require('../data/userProvider').UserProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  userProvider = new UserProvider(config.connectionStr),
  uuids = require('./uuids').users;

exports.create = function(callback) {
  userProvider.removeAll(function(err) {
    if (err) { console.log(err); throw err; }

    let users = [];
    users.push({
      id: uuids[0],
      username: 'admin',
      email: 'admin@example.com',
      password: 'reactive-admin',
      role: 'admin',
      emp: "Manquehue"
    });
    users.push({
      id: uuids[1],
      username: 'admin-prueba',
      email: 'admin-prueba@example.com',
      password: 'reactive-admin',
      role: 'admin',
      emp: "Empresa de Prueba"
    });
    // users.push({
      // id: uuids[1],
      // username: 'user',
      // email: 'user@example.com',
      // password: 'reactive-user',
      // role: 'user',
      // emp: "Empresa de Prueba"
    // });

    async.each(users, function(user, cb) {
      userProvider.save(user, cb);
    }, function(err) {
      callback(err);
    });
  });
};

exports.removeAll = function(callback) {
  userProvider.removeAll(callback);
};
