'use strict';

const
  async = require('async'),
  faker = require('faker'),
  ProjectProvider = require('../data/projectProvider').ProjectProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  projectProvider = new ProjectProvider(config.connectionStr),
  uuids = require('./uuids').projects,
  user_id = require('./uuids').users[0];

faker.locale = "es";

exports.createProjects = function(callback) {
  let i, projects = [];
  
  for (i = 0; i < 10; i++) {
    projects.push({
      id: uuids[i],
      id_user: user_id,
      name: faker.company.catchPhrase()
    });
  }

  projectProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.each(projects, function(project, cb) {
      projectProvider.save(project, function(err, result) {
        cb(err);
      });
    }, function(err) {
      callback(err);
    });
  });
};

exports.removeAll = function(callback) {
  projectProvider.removeAll(callback);
};
