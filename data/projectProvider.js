'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const ProjectProvider = function(connStr) {
  this.connStr = connStr;
};

ProjectProvider.prototype.findAllByUser = function(userId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT DISTINCT id, name, created_at, updated_at");
    sql.push("FROM projects p INNER JOIN users_projects_templates upt ON p.id = upt.id_project");
    sql.push("WHERE upt.id_user = $1");
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

ProjectProvider.prototype.findAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name, created_at, updated_at FROM projects", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

ProjectProvider.prototype.findByName = function(name, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name, created_at, updated_at FROM projects WHERE name=$1", [name], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

ProjectProvider.prototype.findById = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name, created_at, updated_at FROM projects WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

ProjectProvider.prototype.save = function(project, callback) {
  let self = this;
  
  this.validate(project, function(err, project) {
    if (err) { return callback(Err("validation error", { code: 2001, description: "project validation error", errors: err})); }

    db.connect(self.connStr, function(err, client, done) {
      if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

      if (project.id) {
        client.query("INSERT INTO projects(id, name) VALUES($1, $2) RETURNING id", 
        [project.id, project.name], function(err, result) {
          if (err) { 
            done(client);
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      } else {
        client.query("INSERT INTO projects(name) VALUES($1) RETURNING id", [project.name], function(err, result) {
          if (err) { 
            done(client);
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      }
    });
  });
};

ProjectProvider.prototype.update = function(id, projectData, callback) {
  let self = this;
  
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name, created_at, updated_at FROM projects WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      let project = result.rows[0];
      if (!project) {
        done(client); 
        return callback(Err("no such project", { code: 404, description: "Project " + id + " not found", errors: []}));
      }
      
      _.assign(project, projectData);
      self.validate(project, function(err, project) {
        if (err) { done(client); return callback(Err("validation error", { code: 2001, description: "project validation error", errors: err})); }

        client.query("UPDATE projects SET name=$1, created_at=$2, updated_at=$3 WHERE id=$4 RETURNING id",
        [project.name, project.created_at, project.updated_at, project.id], function(err, result) {
          if (err) {
            done(client);
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      });
    });
  });
};

ProjectProvider.prototype.remove = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("DELETE FROM projects WHERE id=$1 RETURNING id", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

ProjectProvider.prototype.removeAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("TRUNCATE projects", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

ProjectProvider.prototype.validate = function(project, callback) {
  let errors = [];

  async.parallel([
    function(next) {
      if (project.name) {
        if (!validator.isLength(project.name, 4, 255)) {
          errors.push({ param: 'name', msg: 'must have 4-255 chars', value: project.name });
        }
      }
      next();
    }
  ], function(err, results) {
    return (errors.length > 0) ? callback(errors) : callback(null, project);
  });
};

exports.ProjectProvider = ProjectProvider;
