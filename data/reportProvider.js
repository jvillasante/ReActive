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

    client.query("SELECT id, title, data FROM templates WHERE id = $1 LIMIT 1", [templateId], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }
      
      let template = result.rows[0];
      if (!template) {
        done(client); 
        return callback(Err("no such template", { code: 404, description: "Template " + templateId + " not found", errors: []}));
      }
      
      let sql = [];
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

exports.ReportProvider = ReportProvider;
