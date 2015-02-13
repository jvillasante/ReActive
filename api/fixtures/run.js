#!node --harmony
'use strict';

const
  async = require('async'),
  db = require('../lib/db'),
  args = process.argv.slice(2),
  usersFixture = require('./users'),
  projectsFixture = require('./projects'),
  templatesFixture = require('./templates'),
  permissionsFixture = require('./permissions');

function printHelp() {
  console.log('   usage:');
  console.log(' $ fixtures/run.js <option>');
  console.log('   <option>');
  console.log('     all - generate and load test data');
  console.log('     templates - only load the templates on the database');
  console.log('   examples:');
  console.log(' $ fixtures/run.js all');
  console.log(' $ fixtures/run.js templates');
}

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

// default args is "all"
if (args.length <= 0) { args.push("all"); }

args.forEach(function(arg) {
  switch(arg) {
    case '-h':
    case '--help':
      printHelp();
      break;
    case 'all':
      all();
      break;
    case 'templates':
      templates();
      break;
    default:
      printHelp();
      break;
  }
});


