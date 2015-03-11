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

DashboardProvider.prototype.findAllProjects = function(callback) {//{{{
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
};//}}}

DashboardProvider.prototype.findProjectData = function(start, end, projects, callback) {//{{{
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
        },
        function(next) {
          let sql = "SELECT getBenchmarkTable('" + start + "','" + end + "','" + project + "');";
          client.query(sql, function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            data[project].benchmarkTable = result.rows.map(function(value) { return Number(value.getbenchmarktable); });
            next();
          });
        }
      ], function(err) {
        console.log(err);
        cb(err);
      });
    }, function(err) {
      console.log(err);
      if (err) { done(); return callback(err); }

      done();
      callback(null, data);
    });
  });
};//}}}

DashboardProvider.prototype.findProjectDataForGraphic = function(tableNumber, start, end, project, callback) {//{{{
  let data = [];
  start = moment(Number(start)).format('MM/DD/YYYY');
  end = moment(Number(end)).format('MM/DD/YYYY');

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql;
    if (tableNumber === '1' || tableNumber === '2' || tableNumber === '3') {
      sql = "SELECT * FROM getTable" + tableNumber + "Graphic('" + start + "','" + end + "','" + project + "');";
    } else if (tableNumber === '4') {
      sql = "SELECT * FROM getBenchmarkTableGraphic('" + start + "','" + end + "','" + project + "');";
    }

    if (sql) {
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
    } else {
      done();
      callback(null, []);
    }
  });
};//}}}

let tableItems = [
  [],
  // table1
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
  [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],
  [67,68,69,70,71,72,73,74,75,76,77,78],
  [79,80,81,82,83,84,85,86,87],
  [88,89,90,91,92,93],

  // table2
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
  [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],
  [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
  [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78],
  [79,80,81,82,83,84,85,86,87,88,89,90],
  [91,92,93,94,95,96,97,98]

  // table3 - no items, all template
];

let reportData = [
  [], [],
  [
    "",
    "Visitador de Obra Asiste", "Visitador de Obra Cumple",
    "Administrador de Obra Asiste", "Administrador de Obra Cumple",
    "Jefe de Terreno Asiste", "Jefe de Terreno Cumple",
    "Jefe de Obra Asiste", "Jefe de Obra Cumple",
    "Supervisión, capataces, jefe trazados Asiste", "Supervisión, capataces, jefe trazados Cumple",
    "Representante de Of. Técnica Asiste", "Representante de Of. Técnica Cumple",
    "Adquisiciones (Bodega) Asiste", "Adquisiciones (Bodega) Cumple",
    "Encargado de Programación Asiste", "Encargado de Programación Cumple",
    "Subcontratistas Asiste", "Subcontratistas Cumple",
    "Encargado de Urbanización Asiste", "Encargado de Urbanización Cumple",
    "Encargado de Calidad Asiste", "Encargado de Calidad Cumple",
    "Prevencionista de Riesgo Asiste", "Prevencionista de Riesgo Cumple",
  ]
]

DashboardProvider.prototype.findProjectReports = function(templateId, col, start, end, project, callback) {//{{{
  start = moment(Number(start)).format('MM/DD/YYYY');
  end = moment(Number(end)).format('MM/DD/YYYY');

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = ["SELECT u.username AS username, u.photo AS userImage,"];
    sql.push("r.title AS reportTitle, to_char(r.created_at, 'YYYY-MM-DD') AS created, to_char(r.updated_at, 'YYYY-MM-DD') AS updated,");
    sql.push("v.item AS item, v.value AS value");
    sql.push("FROM values v INNER JOIN fields f ON f.id = v.id_field");
    sql.push("INNER JOIN reports r ON r.id = f.id_report");
    sql.push("INNER JOIN users u ON u.id = r.id_user");
    sql.push("INNER JOIN projects p ON p.id = r.id_project");
    sql.push("WHERE r.id_template = $1 AND (r.updated_at::date BETWEEN $2 AND $3)");
    sql.push("AND p.name = $4");
    if (templateId == 2 || templateId == 3) {
      sql.push("AND v.item IN (" + tableItems[col].join(',') + ")");
    }

    client.query(sql.join(' '), [templateId, start, end, project], function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      let reports = [];
      let grouped = _.groupBy(result.rows, function(row) { return row.reporttitle; });
      for (let obj in grouped) {
        if (grouped.hasOwnProperty(obj)) {
          reports.push({
            title: obj,
            created: grouped[obj][0].created,
            updated: grouped[obj][0].updated,
            userImage: grouped[obj][0].userimage,
            userName: grouped[obj][0].username,
            data: grouped[obj].map(function(val) {
              return {
                question: reportData[templateId][val.item],
                answer: val.value
              };
            })
          });
        }
      }

      done();
      callback(null, reports);
    });
  });
};//}}}

exports.DashboardProvider = DashboardProvider;
