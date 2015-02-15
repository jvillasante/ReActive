'use strict';

const
  _ = require('lodash'),
  async = require('async'),
  faker = require('faker'),
  PermissionProvider = require('../data/permissionProvider').PermissionProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  permissionProvider = new PermissionProvider(config.connectionStr),
  uuids = require('./uuids');

faker.locale = "es";

exports.create = function(callback) {
  permissionProvider.removeAll(function(err) {
    if (err) { throw err; }

    _.times(uuids.projects.length, function(p) {
      _.times(uuids.templates.length, function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    callback();
  });
};

exports.removeAll = function(callback) {
  permissionProvider.removeAll(callback);
};
