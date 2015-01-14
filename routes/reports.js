'use strict';

const
  _ = require('lodash'),
  errTo = require('errto'),
  Err = require('custom-err'),
  ReportProvider = require('../data/reportProvider').ReportProvider;
  
exports.create = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);

  reportProvider.createNew(req.user.id, req.params.projectId, req.params.templateId, errTo(next, function(result) {
    if (!result) {
      return next(Err("cannot create report", { code: 500, description: "Error creating report.", errors: []}));
    }
    
    res
      .status(201)
      .set('Location', '/projects/' + req.params.projectId + '/templates/' + req.params.templateId + '/reports/' + result.id)
      .send(result);
  }));
};

exports.allByUser = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  
  reportProvider.findAllByUser(req.user.id, errTo(next, function(reports) {
    if (!reports) {
      return next(Err("report not found", { code: 404, description: "No report found.", errors: []}));
    }

    res.status(200).send(reports);
  }));
};

exports.allByProject = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  
  reportProvider.findAllByProject(req.user.id, req.params.projectId, errTo(next, function(reports) {
    if (!reports) {
      return next(Err("report not found", { code: 404, description: "No report found.", errors: []}));
    }

    res.status(200).send(reports);
  }));
};

exports.allByProjectAndTemplate = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  
  reportProvider.findAllByProjectAndTemplate(req.user.id, req.params.projectId, req.params.templateId, errTo(next, function(reports) {
    if (!reports) {
      return next(Err("report not found", { code: 404, description: "No report found.", errors: []}));
    }

    res.status(200).send(reports);
  }));
};

