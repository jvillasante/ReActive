'use strict';

const
  async = require('async'),
  faker = require('faker'),
  AssociationProvider = require('../data/associationProvider').AssociationProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  associationProvider = new AssociationProvider(config.connectionStr),
  uuids = require('./uuids');

faker.locale = "es";

exports.createAssociations = function(callback) {
  associationProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.parallel([
      function(cb) {
        associationProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[0], uuids.templates[0], cb);
      },
      function(cb) {
        associationProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[0], uuids.templates[1], cb);
      },
    ], function(err, results) {
      callback(err);
    });
  });
};

