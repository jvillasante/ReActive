'use strict';

const
  _ = require('lodash'),
  errTo = require('errto'),
  Err = require('custom-err'),
  TemplateProvider = require('../data/templateProvider').TemplateProvider,
  utils = require('../lib/utils');

exports.getById = function(req, res, next) {
  let templateProvider = new TemplateProvider(req.connectionStr);

  templateProvider.findById(req.user.id, req.params.projectId, req.params.templateId, errTo(next, function(templateData) {
    if (!templateData) {
      return next(Err("template not found", { code: 404, description: "No template found for user: " +
              req.user.username + " and project: " + req.params.projectId + ".", errors: []}));
    }

    res.status(200).send(templateData);
  }));
};

exports.allByProject = function(req, res, next) {
  let templateProvider = new TemplateProvider(req.connectionStr);
  let meta = utils.meta(req);

  templateProvider.findAllByUserAndProject(meta, req.user.id, req.params.projectId, errTo(next, function(result) {
    if (result.total <= 0) {
      return next(Err("template not found", { code: 404, description: "No template found for user: " +
              req.user.username + " and project: " + req.params.projectId + ".", errors: []}));
    }

    res.status(200).send({
      metadata: {
        pagination: utils.pagination(req, meta.offset, meta.limit, result.total)
      },
      records: result.records
    });
  }));
};

exports.allByProjectAndParent = function(req, res, next) {
  let templateProvider = new TemplateProvider(req.connectionStr);

  templateProvider.findAllByUserAndProjectAndParent(req.user.id, req.params.projectId, req.params.parentId, errTo(next, function(templateData) {
    if (!templateData) {
      return next(Err("template not found", { code: 404, description: "No template found for user: " +
              req.user.username + " and project: " + req.params.projectId + ".", errors: []}));
    }

    res.status(200).send(templateData);
  }));
};

