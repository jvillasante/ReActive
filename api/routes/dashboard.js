'use strict';

const
  _ = require('lodash'),
  errTo = require('errto'),
  Err = require('custom-err'),
  ProjectProvider = require('../data/projectProvider').ProjectProvider,
  utils = require('../lib/utils');

exports.allProjects = function(req, res, next) {
  let projectProvider = new ProjectProvider(req.connectionStr);

  projectProvider.findAll(errTo(next, function(result) {
    if (!result || result.length <= 0) {
      return next(Err("projects not found", { code: 404, description: "No projects found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send(result);
  }));
};

exports.getProjectData = function(req, res, next) {
  let projectProvider = new ProjectProvider(req.connectionStr);
  let start = req.query.start;
  let end = req.query.end;
  let projects = req.query.projects.split('|');

  projectProvider.findProjectData(start, end, projects, errTo(next, function(result) {
    if (!result) {
      return next(Err("project data not found", { code: 404, description: "No project data found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send(result);
  }));
};
