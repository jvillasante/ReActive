'use strict';

const
  async = require('async'),
  faker = require('faker'),
  PermissionProvider = require('../data/permissionProvider').PermissionProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  permissionProvider = new PermissionProvider(config.connectionStr),
  uuids = require('./uuids');

faker.locale = "es";

exports.createPermissions = function(callback) {
  permissionProvider.removeAll(function(err) {
    if (err) { throw err; }

    for (var i = 0; i < 15; i++) {
      async.parallel([
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[0], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[1], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[2], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[3], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[4], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[5], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[6], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[7], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[8], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[9], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[10], cb);
        },
        function(cb) {
          permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[i], uuids.templates[11], cb);
        },
      ], function(err, results) {
        callback(err);
      });
    }
  });
};

exports.removeAll = function(callback) {
  permissionProvider.removeAll(callback);
};

