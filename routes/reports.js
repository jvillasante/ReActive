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

exports.update = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  let report = req.body; 
  
  if (!report.sent) {
    return next(Err("expecting a sent value", { code: 400, description: "pass a sent value to update report.", errors: []}));
  }
  if (!Array.isArray(report.fields)) {
    return next(Err("expecting a fields array", { code: 400, description: "pass a fields array to update report.", errors: []}));
  }
  
  reportProvider.update(req.user.id, req.params.id, report, errTo(next, function() {
    res.status(204).end();
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

