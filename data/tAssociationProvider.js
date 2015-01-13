'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const TAssociationProvider = function(connStr) {
  this.connStr = connStr;
};

TAssociationProvider.prototype.userAndTemplateAndProject = function(idUser, idTemplate, idProject, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("INSERT INTO users_templates(id_user, id_template, id_project) VALUES($1, $2, $3)", 
    [idUser, idTemplate, idProject], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

TAssociationProvider.prototype.templateAndSection = function(idTemplate, idSection, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("INSERT INTO t_templates_sections(id_section, id_template) VALUES($1, $2)", [idSection, idTemplate], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

TAssociationProvider.prototype.sectionAndSubsection = function(idSection, idSubSection, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("INSERT INTO t_sections_subsections(id_section, id_subsection) VALUES($1, $2)", [idSection, idSubSection], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

TAssociationProvider.prototype.subSectionAndGroup = function(idSubSection, idGroup, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("INSERT INTO t_subsections_groups(id_subsection, id_group) VALUES($1, $2)", [idSubSection, idGroup], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

TAssociationProvider.prototype.groupAndField = function(idGroup, idField, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("INSERT INTO t_groups_fields(id_group, id_field) VALUES($1, $2)", [idGroup, idField], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

TAssociationProvider.prototype.removeAllAssociations = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    async.parallel([
      function(cb) {
        client.query("TRUNCATE users_templates", function(err, result) {
          cb(err);
        });
      },
      function(cb) {
        client.query("TRUNCATE t_templates_sections", function(err, result) {
          cb(err);
        });
      },
      function(cb) {
        client.query("TRUNCATE t_sections_subsections", function(err, result) {
          cb(err);
        });
      },
      function(cb) {
        client.query("TRUNCATE t_subsections_groups", function(err, result) {
          cb(err);
        });
      },
      function(cb) {
        client.query("TRUNCATE t_groups_fields", function(err, result) {
          cb(err);
        });
      }
    ], function(err, results) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, results);
    });
  });
};

exports.TAssociationProvider = TAssociationProvider;
