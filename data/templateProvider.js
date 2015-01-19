'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const TemplateProvider = function(connStr) {
  this.connStr = connStr;
};

TemplateProvider.prototype.findAllByUserAndProject = function(userId, projectId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT DISTINCT id, title FROM templates t");
    sql.push("INNER JOIN permissions ps ON t.id = ps.id_template");
    sql.push("WHERE ps.id_user = $1 AND ps.id_project = $2");
    sql.push("ORDER BY id");
    client.query(sql.join(' '), [userId, projectId], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TemplateProvider.prototype.save = function(id, title, json, callback) {
  let 
    self = this,
    sections = json.sections,
    fieldsJSON = [];
    
  async.each(sections, function(section, cb) {
    let sectionsCb = cb, subsections = section.subsections;
    async.each(subsections, function(subsection, cb) {
      let subsectionsCb = cb, groups = subsection.groups;
      async.each(groups, function(group, cb) {
        let groupsCb = cb, fields = group.fields;
        async.each(fields, function(value, cb) {
          fieldsJSON.push(value);
          cb();
        }, function(err) {
          groupsCb(err);
        });
      }, function(err) {
        subsectionsCb(err);
      });
    }, function(err) {
      sectionsCb(err);
    });
  }, function(err) {
    if (err) { return callback(err); }
    
    db.connect(self.connStr, function(err, client, done) {
      if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

      client.query("INSERT INTO templates(id, title, data, fields) VALUES($1, $2, $3, $4) RETURNING id", 
      [id, title, json, JSON.stringify(fieldsJSON)], function(err, result) {
        if (err) { 
          done(client);
          return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
        }

        done();
        callback(null, result.rows[0]);
      });
    });
  });
};

TemplateProvider.prototype.removeAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("TRUNCATE templates CASCADE", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

exports.TemplateProvider = TemplateProvider;
