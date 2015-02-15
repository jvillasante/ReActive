'use strict';

const
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db'),
  utils = require('../lib/utils');

const TemplateProvider = function(connStr) {
  this.connStr = connStr;
};

TemplateProvider.prototype.findById = function(userId, projectId, templateId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT t.id, t.id_parent, t.is_parent, t.title, t.color, t.abr, t.data, t.fields FROM templates t");
    sql.push("INNER JOIN permissions ps ON t.id = ps.id_template");
    sql.push("WHERE ps.id_user = $1 AND ps.id_project = $2 AND t.id = $3");
    client.query(sql.join(' '), [userId, projectId, templateId], function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

TemplateProvider.prototype.findAllByUserAndProject = function(meta, userId, projectId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT DISTINCT t.id, t.title, t.color, t.abr, t.is_parent FROM templates t");
    sql.push("INNER JOIN permissions ps ON t.id = ps.id_template");
    sql.push("WHERE ps.id_user = $1 AND ps.id_project = $2 AND t.id_parent = 0");

    client.query(utils.count(sql.join(' ')), [userId, projectId], function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      let total = result.rows[0].total;
      sql.push("ORDER BY t.id OFFSET $3 LIMIT $4");

      client.query(sql.join(' '), [userId, projectId, meta.offset, meta.limit], function(err, result) {
        if (err) {
          done();
          return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
        }

        async.map(result.rows, function(item, cb) {
          if (item.is_parent === true) {
            sql = [];
            sql.push("SELECT DISTINCT t.id, t.title, t.color, t.abr, t.is_parent FROM templates t");
            sql.push("INNER JOIN permissions ps ON t.id = ps.id_template");
            sql.push("WHERE ps.id_user = $1 AND ps.id_project = $2 AND t.id_parent = $3");
            sql.push("ORDER BY t.id");
            client.query(sql.join(' '), [userId, projectId, item.id], function(err, result) {
              if (err) {
                done();
                return cb(Err("db query error", { code: 1002, description: err.message, errors: []}));
              }

              cb(null, {
                id: item.id,
                title: item.title,
                color: item.color,
                abr: item.abr,
                is_parent: item.is_parent,
                childs: result.rows
              });
            });
          } else {
            cb(null, item);
          }
        }, function(err, results){
          done();
          callback(err, {
            total: Number(total),
            records: results
          });
        });
      });
    });
  });
};

TemplateProvider.prototype.findAllByUserAndProjectAndParent = function(userId, projectId, parentId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT DISTINCT t.id, t.title, t.color, t.abr, t.is_parent FROM templates t");
    sql.push("INNER JOIN permissions ps ON t.id = ps.id_template");
    sql.push("WHERE ps.id_user = $1 AND ps.id_project = $2 AND t.id_parent = $3");
    sql.push("ORDER BY t.id");
    client.query(sql.join(' '), [userId, projectId, parentId], function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TemplateProvider.prototype.save = function(json, callback) {
  let self = this;

  if (json.is_parent === false) {
    let
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

        client.query("INSERT INTO templates(id, id_parent, is_parent, title, color, abr, data, fields) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [json.id, json.id_parent, json.is_parent, json.title, json.color, json.abbr, json, JSON.stringify(fieldsJSON)], function(err, result) {
          if (err) {
            done();
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      });
    });
  } else {
    db.connect(self.connStr, function(err, client, done) {
      if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

      client.query("INSERT INTO templates(id, id_parent, is_parent, title, color, abr, data) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      [json.id, json.id_parent, json.is_parent, json.title, json.color, json.abbr, json], function(err, result) {
        if (err) {
          console.log(err);
          done();
          return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
        }

        done();
        callback(null, result.rows[0]);
      });
    });
  }
};

TemplateProvider.prototype.removeAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("TRUNCATE templates CASCADE", function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

exports.TemplateProvider = TemplateProvider;
