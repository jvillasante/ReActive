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

    async.parallel([
      function(cb) {
        permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[0], uuids.templates[0], cb);
      },
      function(cb) {
        permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[0], uuids.templates[1], cb);
      },
      function(cb) {
        permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[0], uuids.templates[2], cb);
      },
    ], function(err, results) {
      callback(err);
    });
  });
};

