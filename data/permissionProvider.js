'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const PermissionProvider = function(connStr) {
  this.connStr = connStr;
};

PermissionProvider.prototype.userAndTemplateAndProject = function(idUser, idProject, idTemplate, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("INSERT INTO permissions(id_user, id_project, id_template) VALUES($1, $2, $3)", 
    [idUser, idProject, idTemplate], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

PermissionProvider.prototype.removeAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    client.query("TRUNCATE permissions", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

exports.PermissionProvider = PermissionProvider;
