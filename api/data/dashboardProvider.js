'use strict';

const
  _ = require('lodash'),
  moment = require('moment'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const DashboardProvider = function(connStr) {
  this.connStr = connStr;
};

DashboardProvider.prototype.findAllProjects = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT DISTINCT id, name, address, image, to_char(created_at,'YYYY-MM-DD HH24:MI:SS') AS created_at, to_char(updated_at,'YYYY-MM-DD HH24:MI:SS') AS updated_at FROM projects",
    function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

DashboardProvider.prototype.findProjectData = function(start, end, projects, callback) {
  let data = {};
  start = moment(Number(start)).format('MM/DD/YYYY');
  end = moment(Number(end)).format('MM/DD/YYYY');

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    async.each(projects, function(project, cb) {
      data[project] = {};

      async.parallel([
        function(next) {
          let sql = "SELECT getTable1('" + start + "','" + end + "','" + project + "');";
          client.query(sql, function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            data[project].table1 = result.rows.map(function(value) { return Number(value.gettable1); });
            next();
          });
        },
        function(next) {
          let sql = "SELECT getTable2('" + start + "','" + end + "','" + project + "');";
          client.query(sql, function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            data[project].table2 = result.rows.map(function(value) { return Number(value.gettable2); });
            next();
          });
        },
        function(next) {
          let sql = "SELECT getTable3('" + start + "','" + end + "','" + project + "');";
          client.query(sql, function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            data[project].table3 = result.rows.map(function(value) { return Number(value.gettable3); });
            next();
          });
        }
      ], function(err) {
        cb(err);
      });
    }, function(err) {
      if (err) { done(); return callback(err); }

      done();
      callback(null, data);
    });
  });
};

DashboardProvider.prototype.findProjectDataForGraphic = function(tableNumber, start, end, project, callback) {
  let data = [];
  start = moment(Number(start)).format('MM/DD/YYYY');
  end = moment(Number(end)).format('MM/DD/YYYY');

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = "SELECT * FROM getTable" + tableNumber + "Graphic('" + start + "','" + end + "','" + project + "');";
    client.query(sql, function(err, result) {
      if (err) { done(); return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }

      let series = [];
      let grouped = _.groupBy(result.rows, function(row) { return row.col; });
      for (let obj in grouped) {
        if (grouped.hasOwnProperty(obj)) {
          series.push({ name: obj, data: grouped[obj].map(function(val) { return [val.thedate, val.percent]; })});
        }
      }

      done();
      callback(null, series);
    });
  });
};

exports.DashboardProvider = DashboardProvider;
