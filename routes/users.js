'use strict';

const
  _ = require('lodash'),
  errTo = require('errto'),
  Err = require('custom-err'),
  publicAttributes = ['id', 'username', 'email', 'role'];

exports.all = function(req, res, next) {
  req.userProvider.findAll(errTo(next, function(userData) {
    if (!userData) {
      return next(Err("user not found", { code: 404, description: "No user found.", errors: []}));
    }

    res.status(200).send(userData);
  }));
};

exports.show = function(req, res, next) {
  req.userProvider.findById(req.params.id, errTo(next, function(userData) {
    if (!userData) {
      return next(Err("user not found", { code: 404, description: "User " + req.params.id + " not found.", errors: []}));
    }

    res.status(200).send(userData);
  }));
};

exports.create = function(req, res, next) {
  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  req.userProvider.save(user, errTo(next, function(result) {
    if (!result || !result.id) {
      return next(Err("an error has ocurred", { code: 500, description: "User " + user.username + " can't be saved.", errors: []}));
    }
    
    _.assign(user, result);
    res
      .status(201)
      .set('Location', '/users/' + user.id)
      .send(_.pick(user, publicAttributes));
  }));
};

exports.update = function(req, res, next) {
  if (req.params.id !== req.user.id) {
    return next(Err("cannot update other users", { code: 403, description: "Log in as the user you are trying to update.", errors: []}));
  }

  if (!Array.isArray(req.body)) {
    return next(Err("use JSON Patch", { code: 400, description: "JSON Patch protocol: http://tools.ietf.org/html/rfc6902", errors: []}));
  }

  if (req.body.some(function(item) { return item.op !== 'replace'; })) {
    return next(Err("only replace is supported atm", { code: 422, description: "JSON Patch protocol: http://tools.ietf.org/html/rfc6902", errors: []}));
  }
  
  let userData = {};
  req.body.forEach(function(item) {
    if (item.path === '/username' || item.path === '/email' || item.path === '/password') {
      userData[item.path.replace(/^\//, '')] = item.value;
    }
  });

  req.userProvider.update(req.params.id, userData, errTo(next, function(result) {
    if (!result || !result.id) {
      return next(Err("user not found...", { code: 404, description: "User " + req.params.id + " not found.", errors: []}));
    }
    
    res.status(204).end();
  }));
};

exports.remove = function(req, res, next) {
  req.userProvider.remove(req.params.id, errTo(next, function(result) {
    if (!result || !result.id) {
      return next(Err("user not found", { code: 404, description: "User " + req.params.id + " not found.", errors: []}));
    }

    res.status(204).end();
  }));
};
