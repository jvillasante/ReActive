#!/usr/bin/node --harmony
'use strict';

const
  async = require('async'),
  db = require('../lib/db'),
  usersFixture = require('./users'),
  projectsFixture = require('./projects'),
  templatesFixture = require('./templates'),
  tSectionsFixture = require('./tsections'),
  tSubSectionsFixture = require('./tsubsections'),
  tGroupsFixture = require('./tgroups'),
  tFieldsFixture = require('./tfields'),
  tAssociationsFixture = require('./tassociations');

async.parallel([
  function(callback) {
    usersFixture.createUsers(function(err) {
      callback(err);
    });
  },
  function(callback) {
    projectsFixture.createProjects(function(err) {
      callback(err);
    });
  },
  function(callback) {
    templatesFixture.createTemplates(function(err) {
      callback(err);
    });
  },
  function(callback) {
    tSectionsFixture.createSections(function(err) {
      callback(err);
    });
  },
  function(callback) {
    tSubSectionsFixture.createSections(function(err) {
      callback(err);
    });
  },
  function(callback) {
    tGroupsFixture.createGroups(function(err) {
      callback(err);
    });
  },
  function(callback) {
    tFieldsFixture.createFields(function(err) {
      callback(err);
    });
  },
  function(callback) {
    tAssociationsFixture.createAssociations(function(err) {
      callback(err);
    });
  }
], function(err, results) {
  db.disconnect();
  
  if (err) { throw err; }
  console.log('fixture data created.');
});
  
  
