#!node --harmony
'use strict';

const
  async = require('async'),
  db = require('../lib/db'),
  args = process.argv.slice(2),
  usersFixture = require('./users'),
  projectsFixture = require('./projects'),
  templatesFixture = require('./templates'),
  permissionsFixture = require('./permissions'),
  reportsFixture = require('./reports.js');

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
  async.series([
    function(next) {
      async.parallel([
        function(callback) { usersFixture.create(callback); },
        function(callback) { templatesFixture.create(callback); }
      ], function(err) {
        next(err);
      });
    },
    function(next) { projectsFixture.create(next); },
    function(next) { permissionsFixture.create(next); },
    function(next) { reportsFixture.create(next); }
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
    function(callback) { reportsFixture.removeAll(callback); },
    function(callback) { templatesFixture.create(callback); }
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


