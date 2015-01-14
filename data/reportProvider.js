'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const ReportProvider = function(connStr) {
  this.connStr = connStr;
};

ReportProvider.prototype.createNew = function(userId, projectId, templateId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT id, title, data FROM templates t");
    sql.push("INNER JOIN users_projects_templates upt ON t.id = upt.id_template");
    sql.push("WHERE upt.id_user = $1 AND upt.id_project = $2 AND t.id = $3 LIMIT 1");
    client.query(sql.join(' '), [userId, projectId, templateId], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }
      
      let template = result.rows[0];
      if (!template) {
        done(client); 
        return callback(Err("no such template", { code: 404, description: "Template " + templateId + " not found for project " + projectId, errors: []}));
      }
      
      sql = [];
      sql.push("INSERT INTO reports(id_user, id_project, id_template, title)");
      sql.push("VALUES($1, $2, $3, $4) RETURNING id");
      client.query(sql.join(' '), [userId, projectId, template.id, template.title], function(err, result) {
        if (err) { 
          done(client);
          return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
        }
        
        let report = result.rows[0];
        if (!report) {
          done(client); 
          return callback(Err("error creating report", { code: 500, description: "Cannot create report for template " + templateId, errors: []}));
        }
        
        done();
        template.data.id = report.id;
        callback(null, template.data);
      });
    });
  });
};

ReportProvider.prototype.findAllByUser = function(userId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT r.id, r.title, r.created_at, r.updated_at, p.name AS project_name FROM reports r");
    sql.push("INNER JOIN projects p ON r.id_project = p.id");
    sql.push("WHERE r.id_user = $1");
    client.query(sql.join(' '), [userId], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }
      
      done();
      callback(null, result.rows);
    });
  });
};

ReportProvider.prototype.findAllByProject = function(userId, projectId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT r.id, r.title, r.created_at, r.updated_at, p.name AS project_name FROM reports r");
    sql.push("INNER JOIN projects p ON r.id_project = p.id");
    sql.push("WHERE r.id_user = $1 AND r.id_project = $2 AND p.id = $3");
    client.query(sql.join(' '), [userId, projectId, projectId], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }
      
      done();
      callback(null, result.rows);
    });
  });
};

ReportProvider.prototype.findAllByProjectAndTemplate = function(userId, projectId, templateId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT id, title, created_at, updated_at FROM reports r");
    sql.push("WHERE r.id_user = $1 AND r.id_project = $2 AND r.id_template = $3");
    client.query(sql.join(' '), [userId, projectId, templateId], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }
      
      done();
      callback(null, result.rows);
    });
  });
};

exports.ReportProvider = ReportProvider;
