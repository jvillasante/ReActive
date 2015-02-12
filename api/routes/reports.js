'use strict';

const
  _ = require('lodash'),
  async = require('async'),
  errTo = require('errto'),
  Err = require('custom-err'),
  ReportProvider = require('../data/reportProvider').ReportProvider,
  utils = require('../lib/utils');

exports.allByUser = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  let meta = utils.meta(req, {
    state: req.query.state || 'all',
    q: req.query.q || ''
  });

  reportProvider.findAllByUser(meta, req.user.id, errTo(next, function(result) {
    if (result.total <= 0) {
      return next(Err("report not found", { code: 404, description: "No report found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send({
      metadata: {
        pagination: utils.pagination(req, meta.offset, meta.limit, result.total)
      },
      records: result.records
    });
  }));
};

exports.allByProject = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  let meta = utils.meta(req, {
    state: req.query.state || 'all',
    q: req.query.q || ''
  });

  reportProvider.findAllByProject(meta, req.user.id, req.params.projectId, errTo(next, function(result) {
    if (result.total <= 0) {
      return next(Err("report not found", { code: 404, description: "No report found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send({
      metadata: {
        pagination: utils.pagination(req, meta.offset, meta.limit, result.total)
      },
      records: result.records
    });
  }));
};

exports.allByProjectAndTemplate = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);
  let meta = utils.meta(req, {
    state: req.query.state || 'all',
    q: req.query.q || ''
  });

  reportProvider.findAllByProjectAndTemplate(meta, req.user.id, req.params.projectId, req.params.templateId, errTo(next, function(result) {
    if (result.total <= 0) {
      return next(Err("report not found", { code: 404, description: "No report found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send({
      metadata: {
        pagination: utils.pagination(req, meta.offset, meta.limit, result.total)
      },
      records: result.records
    });
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

exports.create = function(req, res, next) {
  let
    body = req.body,
    reportProvider = new ReportProvider(req.connectionStr);

  if (!_.has(body, 'title') || _.isEmpty(body.title)) {
    return next(Err("expecting a report title value", { code: 400, description: "pass a title value to create report.", errors: []}));
  }

  if (!_.has(body, 'sent') || !_.isBoolean(body.sent)) {
    return next(Err("expecting a report sent value", { code: 400, description: "pass a sent value to create report.", errors: []}));
  }

  if (!_.has(body, 'fields') || !_.isArray(body.fields)) {
    return next(Err("expecting a report fields array", { code: 400, description: "pass a fields array to create report.", errors: []}));
  }

  async.each(body.fields, function(value, cb) {
    if (!_.isNumber(value.item) || _.isEmpty(value.value)) {
      return cb(Err("expecting report fields values", { code: 400, description: "fields values: {item:<Number>, name:<String>, value:<String>}", errors: []}));
    }
    cb();
  }, function(err) {
    if (err) { return next(err); }
  });

  reportProvider.create(req.user.id, req.params.projectId, req.params.templateId, body, errTo(next, function(reportId) {
    if (!reportId) {
      return next(Err("cannot create report", { code: 500, description: "Error creating report.", errors: []}));
    }

    res
      .status(201)
      .set('Location', '/reports/' + reportId)
      .send();
  }));
};

exports.addField = function(req, res, next) {
  let
    body = req.body,
    reportProvider = new ReportProvider(req.connectionStr);

  if (!_.isArray(body)) {
    return next(Err("expecting a report fields array", { code: 400, description: "pass a fields array to create report.", errors: []}));
  }

  async.each(body, function(value, cb) {
    if (!_.isNumber(value.item) || _.isEmpty(value.value)) {
      return cb(Err("expecting report fields values", { code: 400, description: "fields values: {item:<Number>, name:<String>, value:<String>}", errors: []}));
    }
    cb();
  }, function(err) {
    if (err) { return next(err); }
  });

  reportProvider.addField(req.user.id, req.params.id, body, errTo(next, function(reportId) {
    if (!reportId) {
      return next(Err("cannot add field values to report", { code: 500, description: "Error adding field values to report.", errors: []}));
    }

    res
      .status(204)
      .set('Location', '/reports/' + reportId)
      .send();
  }));
};

exports.update = function(req, res, next) {
  let
    body = req.body,
    reportProvider = new ReportProvider(req.connectionStr);

  if (!_.has(body, 'title') || _.isEmpty(body.title)) {
    return next(Err("expecting a report title value", { code: 400, description: "pass a title value to create report.", errors: []}));
  }

  if (!_.has(body, 'sent') || !_.isBoolean(body.sent)) {
    return next(Err("expecting a report sent value", { code: 400, description: "pass a sent value to create report.", errors: []}));
  }

  reportProvider.update(req.user.id, req.params.id, body, errTo(next, function(reportId) {
    if (!reportId) {
      return next(Err("cannot update report", { code: 500, description: "Error updating report.", errors: []}));
    }

    res
      .status(204)
      .set('Location', '/reports/' + reportId)
      .send();
  }));
};

exports.remove = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);

  reportProvider.remove(req.user.id, req.params.id, errTo(next, function(reportId) {
    if (!reportId) {
      return next(Err("cannot remove report", { code: 500, description: "Error removing report.", errors: []}));
    }

    res
      .status(204)
      .send();
  }));
};

exports.showField = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);

  reportProvider.showField(req.user.id, req.params.reportId, req.params.id, errTo(next, function(result) {
    if (!result || result.length <= 0) {
      return next(Err("cannot get field values", { code: 500, description: "Error getting report field values.", errors: []}));
    }

    res
      .status(200)
      .send(result);
  }));
};

exports.updateField = function(req, res, next) {
  let
    body = req.body,
    reportProvider = new ReportProvider(req.connectionStr);

  if (!_.isArray(body)) {
    return next(Err("expecting a report fields array", { code: 400, description: "pass a fields array to create report.", errors: []}));
  }

  async.each(body, function(value, cb) {
    if (!_.isNumber(value.item) || _.isEmpty(value.value)) {
      return cb(Err("expecting report fields values", { code: 400, description: "fields values: {item:<Number>, name:<String>, value:<String>}", errors: []}));
    }
    cb();
  }, function(err) {
    if (err) { return next(err); }
  });

  reportProvider.updateField(req.user.id, req.params.reportId, req.params.id, body, errTo(next, function(reportId) {
    if (!reportId) {
      return next(Err("cannot update field values", { code: 500, description: "Error updating report field values.", errors: []}));
    }

    res
      .status(204)
      .set('Location', '/reports/' + reportId)
      .send();
  }));
};

exports.removeField = function(req, res, next) {
  let reportProvider = new ReportProvider(req.connectionStr);

  reportProvider.removeField(req.user.id, req.params.reportId, req.params.id, errTo(next, function(reportId) {
    if (!reportId) {
      return next(Err("cannot remove field values", { code: 500, description: "Error removing report field values.", errors: []}));
    }

    res
      .status(204)
      .send();
  }));
};

