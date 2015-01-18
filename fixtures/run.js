#!/usr/bin/node --harmony
'use strict';

const
  async = require('async'),
  db = require('../lib/db'),
  args = process.argv.slice(2),
  usersFixture = require('./users'),
  projectsFixture = require('./projects'),
  templatesFixture = require('./templates'),
  permissionsFixture = require('./permissions');

function all() {
  async.waterfall([
    function(next) {
      async.parallel([
        function(callback) { usersFixture.createUsers(callback); },
        function(callback) { templatesFixture.createTemplates(callback); }
      ], function(err) {
        next(err);
      }); 
    },
    function(next) { projectsFixture.createProjects(next); },
    function(next) { permissionsFixture.createPermissions(next); }
  ], function(err) {
    db.disconnect();
    if (err) { console.log(err); throw err; }
    console.log('fixture data created.');
  });
}

function templates() {
  async.parallel([
    function(callback) { usersFixture.removeAll(callback); },
    function(callback) { projectsFixture.removeAll(callback); },
    function(callback) { permissionsFixture.removeAll(callback); },
    function(callback) { templatesFixture.createTemplates(callback); }
  ], function(err) {
    db.disconnect();
    if (err) { console.log(err); throw err; }
    console.log('template data created.');
  });
}

if (args[0] === 'all') {
  all();
} else if (args[0] === 'templates') {
  templates();
} else {
  console.log("USSAGE: fixtures/run.js [all|templates]");
}

