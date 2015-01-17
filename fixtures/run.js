#!/usr/bin/node --harmony
'use strict';

const
  async = require('async'),
  db = require('../lib/db'),
  usersFixture = require('./users'),
  projectsFixture = require('./projects'),
  templatesFixture = require('./templates'),
  permissionsFixture = require('./permissions');

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
    permissionsFixture.createPermissions(function(err) {
      callback(err);
    });
  }
], function(err, results) {
  db.disconnect();
  
  if (err) { 
    console.log(err);
    throw err; 
  }
  console.log('fixture data created.');
});

  
  
