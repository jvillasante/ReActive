'use strict';

const
  _ = require('lodash'),
  errTo = require('errto'),
  Err = require('custom-err'),
  TemplateProvider = require('../data/templateProvider').TemplateProvider;

exports.allByProject = function(req, res, next) {
  let templateProvider = new TemplateProvider(req.connectionStr);
  
  templateProvider.findAllByUserAndProject(req.user.id, req.params.projectId, errTo(next, function(templateData) {
    if (!templateData) {
      return next(Err("template not found", { code: 404, description: "No template found for user: " + 
              req.user.username + " and project: " + req.params.projectId + ".", errors: []}));
    }

    res.status(200).send(templateData);
  }));
};

exports.show = function(req, res, next) {
  let templateProvider = new TemplateProvider(req.connectionStr);
  
  templateProvider.findByUserAndProject(req.user.id, req.params.projectId, req.params.templateId, errTo(next, function(templateData) {
    if (!templateData) {
      return next(Err("template not found", { code: 404, description: "No template found for user: " + 
              req.user.username + " and project: " + req.params.projectId + ".", errors: []}));
    }

    res.status(200).send(templateData);
  }));
};
