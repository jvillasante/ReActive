'use strict';

const
  async = require('async'),
  faker = require('faker'),
  TAssociationProvider = require('../data/tAssociationProvider').TAssociationProvider,
  config = require('../config.json').development,
  tAssociationProvider = new TAssociationProvider(config.connectionStr),
  uuids = require('./uuids');

faker.locale = "es";

exports.createAssociations = function(callback) {
  tAssociationProvider.removeAllAssociations(function(err) {
    if (err) { throw err; }

    async.parallel([
      function(cb) {
        tAssociationProvider.userAndTemplateAndProject(uuids.users[0], uuids.templates[0], uuids.projects[0], cb);
      },
      function(cb) {
        tAssociationProvider.userAndTemplateAndProject(uuids.users[0], uuids.templates[1], uuids.projects[1], cb);
      },
      function(cb) {
        tAssociationProvider.userAndTemplateAndProject(uuids.users[0], uuids.templates[2], uuids.projects[2], cb);
      },
      function(cb) {
        tAssociationProvider.templateAndSection(uuids.templates[0], uuids.tsections[0], cb);
      },
      function(cb) {
        tAssociationProvider.templateAndSection(uuids.templates[0], uuids.tsections[1], cb);
      },
      function(cb) {
        tAssociationProvider.templateAndSection(uuids.templates[0], uuids.tsections[2], cb);
      },
      function(cb) {
        tAssociationProvider.sectionAndSubsection(uuids.tsections[0], uuids.tsubsections[0], cb);
      },
      function(cb) {
        tAssociationProvider.sectionAndSubsection(uuids.tsections[0], uuids.tsubsections[1], cb);
      },
      function(cb) {
        tAssociationProvider.sectionAndSubsection(uuids.tsections[0], uuids.tsubsections[2], cb);
      },
      function(cb) {
        tAssociationProvider.subSectionAndGroup(uuids.tsubsections[0], uuids.tgroups[0], cb);
      },
      function(cb) {
        tAssociationProvider.subSectionAndGroup(uuids.tsubsections[0], uuids.tgroups[1], cb);
      },
      function(cb) {
        tAssociationProvider.subSectionAndGroup(uuids.tsubsections[0], uuids.tgroups[2], cb);
      },
      function(cb) {
        tAssociationProvider.groupAndField(uuids.tgroups[0], uuids.tfields[0], cb);
      },
      function(cb) {
        tAssociationProvider.groupAndField(uuids.tgroups[0], uuids.tfields[1], cb);
      },
      function(cb) {
        tAssociationProvider.groupAndField(uuids.tgroups[0], uuids.tfields[2], cb);
      },
    ], function(err, results) {
      callback(err);
    });
  });
};

