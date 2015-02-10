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

ReportProvider.prototype.findById = function(userId, reportId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    async.waterfall([
      function getReport(next) {
        sql.push("SELECT r.id, r.id_template, r.id_project, r.title, r.sent, r.created_at, r.updated_at, p.name AS project_name, u.username AS user_name");
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
        sql.push("SELECT f.id AS field_id, v.item, v.value FROM values v");
        sql.push("INNER JOIN fields f ON f.id = v.id_field");
        sql.push("WHERE f.id_report = $1");
        sql.push("ORDER BY f.id, v.item");
        client.query(sql.join(' '), [report.id], function(err, result) {
          if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
          if (!result || result.rows.length <= 0) {
            return next(Err("no report data found", { code: 404, description: "No report data found for report " + report.id + ".", errors: []}));
          }

          report.fields = {};
          async.each(result.rows, function(row, cb) {
            if (report.fields[row.field_id]) {
              report.fields[row.field_id].push({ item: row.item, value: row.value });
            } else {
              report.fields[row.field_id] = [{ item: row.item, value: row.value }];
            }
            cb();
          }, function(err) {
            if (err) { return next(err); }
            next(null, report);
          });
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
    sql.push("SELECT r.id, r.id_template, r.id_project, r.title, r.sent, r.created_at, r.updated_at, p.name AS project_name, u.username AS user_name");
    sql.push("FROM users u");
    sql.push("INNER JOIN reports r ON r.id_user = u.id");
    sql.push("INNER JOIN projects p ON r.id_project = p.id");
    sql.push("WHERE u.id = $1");

    client.query(sql.join(' '), [userId], function(err, result) {
      if (err) { return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }
      if (!result || result.rows.length <= 0) {
        return callback(Err("no report found", { code: 404, description: "No report found for user " + userId + ".", errors: []}));
      }

      done(client);
      callback(null, result.rows);
    });
  });
};

ReportProvider.prototype.findAllByProject = function(userId, projectId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT r.id, r.id_template, r.id_project, r.title, r.sent, r.created_at, r.updated_at, p.name AS project_name, u.username AS user_name");
    sql.push("FROM users u");
    sql.push("INNER JOIN reports r ON r.id_user = u.id");
    sql.push("INNER JOIN projects p ON r.id_project = p.id");
    sql.push("WHERE u.id = $1 AND p.id = $2");

    client.query(sql.join(' '), [userId, projectId], function(err, result) {
      if (err) { return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }
      if (!result || result.rows.length <= 0) {
        return callback(Err("no report found", { code: 404, description: "No report found for user " + userId + ".", errors: []}));
      }

      done(client);
      callback(null, result.rows);
    });
  });
};

ReportProvider.prototype.findAllByProjectAndTemplate = function(userId, projectId, templateId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT r.id, r.id_template, r.id_project, r.title, r.sent, r.created_at, r.updated_at, p.name AS project_name, u.username AS user_name");
    sql.push("FROM users u");
    sql.push("INNER JOIN reports r ON r.id_user = u.id");
    sql.push("INNER JOIN projects p ON r.id_project = p.id");
    sql.push("INNER JOIN templates t ON r.id_template = t.id");
    sql.push("WHERE u.id = $1 AND p.id = $2 AND t.id = $3");

    client.query(sql.join(' '), [userId, projectId, templateId], function(err, result) {
      if (err) { return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }
      if (!result || result.rows.length <= 0) {
        return callback(Err("no report found", { code: 404, description: "No report found for user " + userId + ".", errors: []}));
      }

      done(client);
      callback(null, result.rows);
    });
  });
};

ReportProvider.prototype.create = function(userId, projectId, templateId, reportData, callback) {
  let idReport = null;
  let rollback = function(error, client, done) {
    client.query('ROLLBACK', function(err) {
      if (err) {
        done(client);
        return callback(Err("db connection error", { code: 1001, description: err.message, errors: []}));
      }

      done(client);
      return callback(error);
    });
  };

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query('BEGIN', function(err) {
      if (err) { return rollback(err, client, done); }

      let sql = [];
      sql.push("SELECT id FROM templates t");
      sql.push("INNER JOIN permissions ps ON t.id = ps.id_template");
      sql.push("WHERE ps.id_user = $1 AND ps.id_project = $2 AND t.id = $3 LIMIT 1");

      client.query(sql.join(' '), [userId, projectId, templateId], function(err, result) {
        if (err) {
          return rollback(Err("db query error", { code: 1002, description: err.message, errors: []}), client, done);
        }

        if (!result.rows[0].id) {
          return rollback(Err("no such template", { code: 404, description: "Template " + templateId + " not found for project " + projectId, errors: []}), client, done);
        }

        async.waterfall([
          function createReport(next) {
          sql = [];
          sql.push("INSERT INTO reports(id_user, id_project, id_template, title, sent)");
          sql.push("VALUES($1, $2, $3, $4, $5) RETURNING id");
          client.query(sql.join(' '), [userId, projectId, templateId, reportData.title, reportData.sent], function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            next(null, result.rows[0].id);
          });
        },
        function createField(reportId, next) {
          idReport = reportId;

          client.query("INSERT INTO fields(id_report) VALUES($1) RETURNING id", [reportId], function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            next(null, result.rows[0].id);
          });
        },
        function createReportData(fieldId, next) {
          async.each(reportData.fields, function(value, cb) {
            client.query("INSERT INTO values(id_field, item, value) VALUES($1, $2, $3)",
            [fieldId, value.item, value.value], function(err, result) {
              if (err) { return cb(Err("db query error", { code: 1002, description: err.message, errors: []})); }
              cb();
            });
          }, function(err) {
            if (err) { return rollback(err, client, done); }
            next(null, idReport);
          });
        }
        ], function(err, result) {
          if (err) { return rollback(err, client, done); }

          client.query('COMMIT', function(err) {
            if (err) {
              return rollback(Err("db query error", { code: 1002, description: err.message, errors: []}), client, done);
            }

            done(client);
            callback(null, result);
          });
        });
      });
    });
  });
};

ReportProvider.prototype.addField = function(userId, reportId, fieldData, callback) {
  let rollback = function(error, client, done) {
    client.query('ROLLBACK', function(err) {
      if (err) {
        done(client);
        return callback(Err("db connection error", { code: 1001, description: err.message, errors: []}));
      }

      done(client);
      return callback(error);
    });
  };

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query('BEGIN', function(err) {
      if (err) { return rollback(err, client, done); }

      let sql = [];
      sql.push("SELECT r.id FROM reports r");
      sql.push("WHERE r.id_user = $1 AND r.id = $2");
      client.query(sql.join(' '), [userId, reportId], function(err, result) {
        if (err) {
          return rollback(Err("db query error", { code: 1002, description: err.message, errors: []}), client, done);
        }

        if (!result.rows[0].id) {
          return rollback(Err("no such report", { code: 404, description: "Report " + reportId + " not found for user " + userId, errors: []}), client, done);
        }

        async.waterfall([
        function createField(next) {
          client.query("INSERT INTO fields(id_report) VALUES($1) RETURNING id", [reportId], function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            next(null, result.rows[0].id);
          });
        },
        function createReportData(fieldId, next) {
          async.each(fieldData, function(value, cb) {
            client.query("INSERT INTO values(id_field, item, value) VALUES($1, $2, $3)",
            [fieldId, value.item, value.value], function(err, result) {
              if (err) { return cb(Err("db query error", { code: 1002, description: err.message, errors: []})); }
              cb();
            });
          }, function(err) {
            if (err) { return rollback(err, client, done); }
            next(null, reportId);
          });
        }
        ], function(err, result) {
          if (err) { return rollback(err, client, done); }

          client.query('COMMIT', function(err) {
            if (err) {
              return rollback(Err("db query error", { code: 1002, description: err.message, errors: []}), client, done);
            }

            done(client);
            callback(null, result);
          });
        });
      });
    });
  });
};

ReportProvider.prototype.update = function(userId, reportId, data, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query('UPDATE reports SET title=$1, sent=$2 WHERE id=$3 AND id_user=$4 RETURNING id',
    [data.title, data.sent, reportId, userId], function(err, result) {
      if (err) { done(client); return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }

      done(client);
      callback(null, result.rows[0].id);
    });
  });
};

ReportProvider.prototype.remove = function(userId, reportId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query('DELETE FROM reports WHERE id=$1 AND id_user=$2 RETURNING id', [reportId, userId], function(err, result) {
      if (err) { done(client); return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }

      done(client);
      callback(null, result.rows[0].id);
    });
  });
};

ReportProvider.prototype.showField = function(userId, reportId, fieldId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT v.item, v.value FROM values v");
    sql.push("INNER JOIN fields f ON f.id = v.id_field");
    sql.push("INNER JOIN reports r ON r.id = f.id_report")
    sql.push("WHERE r.id_user=$1 AND f.id_report=$2 AND f.id=$3");
    sql.push("ORDER BY v.item");
    client.query(sql.join(' '), [userId, reportId, fieldId], function(err, result) {
      if (err) { done(client); return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }
      if (!result || result.rows.length <= 0) {
        done(client);
        return callback(Err("no report data found", { code: 404, description: "No report data found for report " + report.id + ".", errors: []}));
      }

      done(client);
      callback(null, result.rows);
    });
  });
};

ReportProvider.prototype.updateField = function(userId, reportId, fieldId, fieldData, callback) {
  let rollback = function(error, client, done) {
    client.query('ROLLBACK', function(err) {
      if (err) {
        done(client);
        return callback(Err("db connection error", { code: 1001, description: err.message, errors: []}));
      }

      done(client);
      return callback(error);
    });
  };

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query('SELECT r.id FROM reports r WHERE r.id_user=$1 AND r.id=$2', [userId, reportId], function(err, result) {
      if (err) { done(client); return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }
      if (!result || !result.rows[0].id) {
        done(client);
        return callback(Err("no report found", { code: 404, description: "No report found.", errors: []}));
      }

      client.query('BEGIN', function(err) {
        if (err) { return rollback(err, client, done); }

        async.each(fieldData, function(value, cb) {
          client.query("UPDATE values SET value=$1 WHERE item=$2 AND id_field=$3",
          [value.value, value.item, fieldId], function(err, result) {
            if (err) { return cb(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            cb();
          });
        }, function(err) {
          if (err) { return rollback(err, client, done); }

          client.query('COMMIT', function(err) {
            if (err) {
              return rollback(Err("db query error", { code: 1002, description: err.message, errors: []}), client, done);
            }

            done(client);
            callback(null, reportId);
          });
        });
      });
    });
  });
};

ReportProvider.prototype.removeField = function(userId, reportId, fieldId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query('SELECT r.id FROM reports r WHERE r.id_user=$1 AND r.id=$2', [userId, reportId], function(err, result) {
      if (err) { done(client); return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }
      if (!result || !result.rows[0].id) {
        done(client);
        return callback(Err("no report found", { code: 404, description: "No report found.", errors: []}));
      }

      client.query('DELETE FROM fields WHERE id=$1 AND id_report=$2 RETURNING id', [fieldId, reportId], function(err, result) {
        if (err) { done(client); return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }
        if (!result || !result.rows[0].id) {
          done(client);
          return callback(Err("no field values found", { code: 404, description: "No report field values found.", errors: []}));
        }

        done(client);
        callback(null, reportId);
      });
    });
  });
};

exports.ReportProvider = ReportProvider;
