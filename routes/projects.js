'use strict';

const
  _ = require('lodash'),
  errTo = require('errto'),
  Err = require('custom-err'),
  ProjectProvider = require('../data/projectProvider').ProjectProvider;

exports.all = function(req, res, next) {
  let projectProvider = new ProjectProvider(req.connectionStr);
  
  projectProvider.findAllByUser(req.user.id, errTo(next, function(projectData) {
    if (!projectData) {
      return next(Err("projects not found", { code: 404, description: "No projects found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send(projectData);
  }));
};
