'use strict';

const
  _ = require('lodash'),
  errTo = require('errto'),
  Err = require('custom-err'),
  ProjectProvider = require('../data/projectProvider').ProjectProvider,
  utils = require('../lib/utils'),
  publicAttributes = ['id', 'name', 'created_at', 'updated_at'];

exports.allByUser = function(req, res, next) {
  let projectProvider = new ProjectProvider(req.connectionStr);
  let meta = utils.meta(req);

  projectProvider.findAllByUser(meta, req.user.id, errTo(next, function(result) {
    if (result.total <= 0) {
      return next(Err("projects not found", { code: 404, description: "No projects found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send({
      metadata: {
        pagination: utils.pagination(req, meta.offset, meta.limit, result.total)
      },
      records: result.records
    });
  }));
};

exports.all = function(req, res, next) {
  let projectProvider = new ProjectProvider(req.connectionStr);

  projectProvider.findAll(errTo(next, function(result) {
    if (!result || result.length <= 0) {
      return next(Err("projects not found", { code: 404, description: "No projects found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send(result);
  }));
};


exports.create = function(req, res, next) {
  let projectProvider = new ProjectProvider(req.connectionStr);
  let project = {
    id_user: req.user.id,
    name: req.body.name
  };

  projectProvider.save(project, errTo(next, function(result) {
    if (!result || !result.id) {
      return next(Err("an error has ocurred", { code: 500, description: "Project " + project.name + " can't be created.", errors: []}));
    }

    _.assign(project, result);
    res
      .status(201)
      .set('Location', '/projects/' + project.id)
      .send(project);
  }));
};

exports.show = function(req, res, next) {
  let projectProvider = new ProjectProvider(req.connectionStr);

  projectProvider.findById(req.user.id, req.params.id, errTo(next, function(result) {
    if (!result) {
      return next(Err("project not found", { code: 404, description: "Project " + req.params.id + " not found.", errors: []}));
    }

    res.status(200).send(result);
  }));
};

exports.update = function(req, res, next) {
  if (!Array.isArray(req.body)) {
    return next(Err("use JSON Patch", { code: 400, description: "JSON Patch protocol: http://tools.ietf.org/html/rfc6902", errors: []}));
  }

  if (req.body.some(function(item) { return item.op !== 'replace'; })) {
    return next(Err("only replace is supported atm", { code: 422, description: "JSON Patch protocol: http://tools.ietf.org/html/rfc6902", errors: []}));
  }

  let projectData = {};
  req.body.forEach(function(item) {
    if (item.path === '/name' || item.path === '/created_at' || item.path === '/updated_at') {
      projectData[item.path.replace(/^\//, '')] = item.value;
    }
  });

  let projectProvider = new ProjectProvider(req.connectionStr);
  projectProvider.update(req.user.id, req.params.id, projectData, errTo(next, function(result) {
    if (!result || !result.id) {
      return next(Err("project not found...", { code: 404, description: "Project " + req.params.id + " not found.", errors: []}));
    }

    res.status(204).end();
  }));
};

exports.remove = function(req, res, next) {
  let projectProvider = new ProjectProvider(req.connectionStr);

  projectProvider.remove(req.user.id, req.params.id, errTo(next, function(result) {
    if (!result || !result.id) {
      return next(Err("project not found", { code: 404, description: "Project " + req.params.id + " not found for user " + req.user.username + ".", errors: []}));
    }

    res.status(204).end();
  }));
};
