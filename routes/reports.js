'use strict';

const
  _ = require('lodash'),
  async = require('async'),
  errTo = require('errto'),
  Err = require('custom-err'),
  ReportProvider = require('../data/reportProvider').ReportProvider;
  
exports.create = function(req, res, next) {
  let 
    body = req.body,
    reportProvider = new ReportProvider(req.connectionStr);
  
  if (!body.reportId) {
    reportProvider.createNew(req.user.id, req.params.projectId, req.params.templateId, errTo(next, function(result) {
      if (!result) {
        return next(Err("cannot create report", { code: 500, description: "Error creating report.", errors: []}));
      }
      
      res
        .status(201)
        .set('Location', '/reports/' + result.id)
        .send(result);
    }));
  } else {
    reportProvider.createExisting(req.user.id, req.params.projectId, req.params.templateId, body.reportId, errTo(next, function(result) {
      if (!result) {
        return next(Err("cannot create report", { code: 500, description: "Error creating report.", errors: []}));
      }
      
      res
        .status(201)
        .set('Location', '/reports/' + result.id)
        .send(result);
    }));
  }
};

exports.update = function(req, res, next) {
  let report = req.body; 

  async.parallel([
    function(next) {
      if (!report.report_id) {
        return next(Err("expecting a report_id value", { code: 400, description: "pass a report_id value to update report.", errors: []}));
      }
      next();
    },
    function(next) {
      if (!report.field_id) {
        return next(Err("expecting a field_id value", { code: 400, description: "pass a field_id value to update report.", errors: []}));
      }
      next();
    },
    function(next) {
      if (!report.sent) {
        return next(Err("expecting a sent value", { code: 400, description: "pass a sent value to update report.", errors: []}));
      }
      next();
    },
    function(next) {
      if (!Array.isArray(report.fields)) {
        return next(Err("expecting a fields array", { code: 400, description: "pass a fields array to update report.", errors: []}));
      }
      next();
    }
  ], errTo(next, function(result) {
    let reportProvider = new ReportProvider(req.connectionStr);
    
    reportProvider.update(req.user.id, req.params.id, report, errTo(next, function() {
      res.status(204).end();
    }));
  }));
};

exports.allByUser = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  
  reportProvider.findAllByUser(req.user.id, errTo(next, function(reports) {
    if (!reports || reports.length <= 0) {
      return next(Err("report not found", { code: 404, description: "No report found.", errors: []}));
    }

    res.status(200).send(reports);
  }));
};

exports.allByProject = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  
  reportProvider.findAllByProject(req.user.id, req.params.projectId, errTo(next, function(reports) {
    if (!reports || reports.length <= 0) {
      return next(Err("report not found", { code: 404, description: "No report found.", errors: []}));
    }

    res.status(200).send(reports);
  }));
};

exports.allByProjectAndTemplate = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  
  reportProvider.findAllByProjectAndTemplate(req.user.id, req.params.projectId, req.params.templateId, errTo(next, function(reports) {
    if (!reports || reports.length <= 0) {
      return next(Err("report not found", { code: 404, description: "No report found.", errors: []}));
    }

    res.status(200).send(reports);
  }));
};

exports.show = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  
  reportProvider.findById(req.user.id, req.params.id, errTo(next, function(report) {
    if (!report) {
      return next(Err("report not found", { code: 404, description: "No report found.", errors: []}));
    }

    res.status(200).send(report);
  }));
};

