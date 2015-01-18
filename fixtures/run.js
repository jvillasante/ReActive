#!/usr/bin/node --harmony
'use strict';

const
  async = require('async'),
  db = require('../lib/db'),
  usersFixture = require('./users'),
  projectsFixture = require('./projects'),
  templatesFixture = require('./templates'),
  permissionsFixture = require('./permissions');

async.waterfall([
  function(next) {
    usersFixture.createUsers(function(err) {
      next(err);
    });
  },
  function(next) {
    async.parallel([
      function(callback) {
        projectsFixture.createProjects(function(err) {
          callback(err);
        });
      },
      function(callback) {
        templatesFixture.createTemplates(function(err) {
          callback(err);
        });
      }
    ], function(err) {
      next(err);
    }); 
  },
  function(callback) {
    permissionsFixture.createPermissions(function(err) {
      callback(err);
    });
  }
], function(err) {
  db.disconnect();
  if (err) { console.log(err); throw err; }
  console.log('fixture data created.');
});

