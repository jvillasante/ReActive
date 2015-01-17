'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  errTo = require('errto'),
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
    sql.push("INNER JOIN permissions ps ON t.id = ps.id_template");
    sql.push("WHERE ps.id_user = $1 AND ps.id_project = $2 AND t.id = $3 LIMIT 1");
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

      async.waterfall([
        function createReport(next) {
          sql = [];
          sql.push("INSERT INTO reports(id_user, id_project, id_template, title)");
          sql.push("VALUES($1, $2, $3, $4) RETURNING id");
          
          client.query(sql.join(' '), [userId, projectId, template.id, template.title], function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            next(null, result.rows[0].id);
          });
        }, 
        function createField(reportId, next) {
          template.data.id = reportId;
          
          client.query("INSERT INTO fields(id_report) VALUES($1) RETURNING id", [reportId], function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            next(null, result.rows[0].id);
          });
        },
        function createReportData(fieldId, next) {
          let sections = template.data.sections;
          
          async.each(sections, function(section, cb) {
            let sectionsCb = cb, subsections = section.subsections;
            async.each(subsections, function(subsection, cb) {
              let subsectionsCb = cb, groups = subsection.groups;
              async.each(groups, function(group, cb) {
                let groupsCb = cb, fields = group.fields;
                async.each(fields, function(value, cb) {
                  client.query("INSERT INTO values(id_field, item, name) VALUES($1, $2, $3) RETURNING item", [fieldId, value.item, value.name], function(err, result) {
                    if (err) { return cb(Err("db query error", { code: 1002, description: err.message, errors: []})); }
                    cb();
                  });
                }, errTo(next, function() {
                  groupsCb();
                }));
              }, errTo(next, function() {
                subsectionsCb();
              }));
            }, errTo(next, function() {
              sectionsCb();
            }));
          }, errTo(next, function() {
            next(null, template.data);
          }));
        }
      ], function(err, result) {
        done(client);
        callback(err, result);
      });
    });
  });
};

ReportProvider.prototype.update = function(userId, reportId, report, callback) {
  var self = this;

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id FROM reports WHERE id_user = $1 AND id = $2 LIMIT 1", [userId, reportId], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }
      
      if (!result.rows[0].id) {
        done(client); 
        return callback(Err("no such report", { code: 404, description: "Report " + reportId + " not found for user " + userId, errors: []}));
      }

      async.parallel([
        function(next) {
          client.query("UPDATE reports SET sent = $1 WHERE id = $2", [report.sent, reportId], function(err, callback) {
            next(err);
          });
        },
        function(next) {
          async.each(report.fields, function(value, cb) {
            client.query("UPDATE values SET value = $1 WHERE id_field = $2 AND item = $3", [value.value, report.field_id, value.item], function(err, result) {
              cb(err);
            });
          }, function(err) {
            next(err);
          });
        }
      ], function(err) {
        done(client);
        callback(err);
      });
    });
  });
};

ReportProvider.prototype.findById = function(userId, reportId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    async.waterfall([
      function getReport(next) {
        sql.push("SELECT r.id, r.title, r.sent, r.created_at, r.updated_at, p.name AS project_name, u.username AS user_name");
        sql.push("FROM users u");
        sql.push("INNER JOIN reports r ON r.id_user = u.id");
        sql.push("INNER JOIN projects p ON r.id_project = p.id");
        sql.push("WHERE u.id = $1 AND r.id = $2 LIMIT 1");
        client.query(sql.join(' '), [userId, reportId], function(err, result) {
          if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
          if (!result || !result.rows[0]) {
            return next(Err("no report found", { code: 404, description: "No report found for user " + userId + ".", errors: []}));
          }
          next(null, result.rows[0]);
        });
      },
      function getReportValues(report, next) {
        sql = [];
        sql.push("SELECT v.item, v.name, v.value FROM values v");
        sql.push("INNER JOIN fields f ON f.id = v.id_field");
        sql.push("WHERE f.id_report = $1");
        client.query(sql.join(' '), [report.id], function(err, result) {
          if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
          if (!result || result.rows.length <= 0) {
            return next(Err("no report data found", { code: 404, description: "No report data found for report " + report.id + ".", errors: []}));
          }
          report.fields = result.rows;
          next(null, report);
        });
      }
    ], function(err, report) {
      done(client);
      callback(err, report);
    });
  });
};

ReportProvider.prototype.findAllByUser = function(userId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    async.waterfall([
      function getReport(next) {
        sql.push("SELECT r.id, r.title, r.sent, r.created_at, r.updated_at, p.name AS project_name, u.username AS user_name");
        sql.push("FROM users u");
        sql.push("INNER JOIN reports r ON r.id_user = u.id");
        sql.push("INNER JOIN projects p ON r.id_project = p.id");
        sql.push("WHERE u.id = $1");
        client.query(sql.join(' '), [userId], function(err, result) {
          if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
          if (!result || result.rows.length <= 0) {
            return next(Err("no report found", { code: 404, description: "No report found for user " + userId + ".", errors: []}));
          }
          next(null, result.rows);
        });
      },
      function getReportValues(reports, next) {
        sql = [];
        async.each(reports, function(report, cb) {
          sql = [];
          sql.push("SELECT v.item, v.name, v.value FROM values v");
          sql.push("INNER JOIN fields f ON f.id = v.id_field");
          sql.push("WHERE f.id_report = $1");
          client.query(sql.join(' '), [report.id], function(err, result) {
            if (err) { return cb(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            if (!result || result.rows.length <= 0) {
              return cb(Err("no report data found", { code: 404, description: "No report data found for report " + report.id + ".", errors: []}));
            }
            report.fields = result.rows;
            cb();
          });
        }, function(err) {
          next(err, reports); 
        });
      }
    ], function(err, reports) {
      done(client);
      callback(err, reports);
    });
  });
};

ReportProvider.prototype.findAllByProject = function(userId, projectId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    let sql = [];
    async.waterfall([
      function getReport(next) {
        sql.push("SELECT r.id, r.title, r.sent, r.created_at, r.updated_at, p.name AS project_name, u.username AS user_name");
        sql.push("FROM users u");
        sql.push("INNER JOIN reports r ON r.id_user = u.id");
        sql.push("INNER JOIN projects p ON r.id_project = p.id");
        sql.push("WHERE u.id = $1 AND p.id = $2");
        client.query(sql.join(' '), [userId, projectId], function(err, result) {
          if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
          if (!result || result.rows.length <= 0) {
            return next(Err("no report found", { code: 404, description: "No report found for user " + userId + ".", errors: []}));
          }
          next(null, result.rows);
        });
      },
      function getReportValues(reports, next) {
        sql = [];
        async.each(reports, function(report, cb) {
          sql = [];
          sql.push("SELECT v.item, v.name, v.value FROM values v");
          sql.push("INNER JOIN fields f ON f.id = v.id_field");
          sql.push("WHERE f.id_report = $1");
          client.query(sql.join(' '), [report.id], function(err, result) {
            if (err) { return cb(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            if (!result || result.rows.length <= 0) {
              return cb(Err("no report data found", { code: 404, description: "No report data found for report " + report.id + ".", errors: []}));
            }
            report.fields = result.rows;
            cb();
          });
        }, function(err) {
          next(err, reports); 
        });
      }
    ], function(err, reports) {
      done(client);
      callback(err, reports);
    });
  });
};

ReportProvider.prototype.findAllByProjectAndTemplate = function(userId, projectId, templateId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    async.waterfall([
      function getReport(next) {
        sql.push("SELECT r.id, r.title, r.sent, r.created_at, r.updated_at, p.name AS project_name, u.username AS user_name");
        sql.push("FROM users u");
        sql.push("INNER JOIN reports r ON r.id_user = u.id");
        sql.push("INNER JOIN projects p ON r.id_project = p.id");
        sql.push("INNER JOIN templates t ON r.id_template = t.id");
        sql.push("WHERE u.id = $1 AND p.id = $2 AND t.id = $3");
        client.query(sql.join(' '), [userId, projectId, templateId], function(err, result) {
          if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
          if (!result || result.rows.length <= 0) {
            return next(Err("no report found", { code: 404, description: "No report found for user " + userId + ".", errors: []}));
          }
          next(null, result.rows);
        });
      },
      function getReportValues(reports, next) {
        sql = [];
        async.each(reports, function(report, cb) {
          sql = [];
          sql.push("SELECT v.item, v.name, v.value FROM values v");
          sql.push("INNER JOIN fields f ON f.id = v.id_field");
          sql.push("WHERE f.id_report = $1");
          client.query(sql.join(' '), [report.id], function(err, result) {
            if (err) { return cb(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            if (!result || result.rows.length <= 0) {
              return cb(Err("no report data found", { code: 404, description: "No report data found for report " + report.id + ".", errors: []}));
            }
            report.fields = result.rows;
            cb();
          });
        }, function(err) {
          next(err, reports); 
        });
      }
    ], function(err, reports) {
      done(client);
      callback(err, reports);
    });
  });
};

exports.ReportProvider = ReportProvider;
