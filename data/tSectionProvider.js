'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const TSectionProvider = function(connStr) {
  this.connStr = connStr;
};

TSectionProvider.prototype.findAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name FROM t_sections", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TSectionProvider.prototype.findByName = function(name, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name FROM t_sections WHERE name=$1", [name], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TSectionProvider.prototype.findById = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name FROM t_sections WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

TSectionProvider.prototype.save = function(section, callback) {
  let self = this;
  
  this.validate(section, function(err, section) {
    if (err) { return callback(Err("validation error", { code: 2001, description: "template section validation error", errors: err})); }

    db.connect(self.connStr, function(err, client, done) {
      if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

      if (section.id) {
        client.query("INSERT INTO t_sections(id, name) VALUES($1, $2) RETURNING id", 
        [section.id, section.name], function(err, result) {
          if (err) { 
            done(client);
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      } else {
        client.query("INSERT INTO t_sections(name) VALUES($1) RETURNING id", [section.name], function(err, result) {
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

TSectionProvider.prototype.update = function(id, sectionData, callback) {
  let self = this;
  
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name FROM t_sections WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      let section = result.rows[0];
      if (!section) {
        done(client); 
        return callback(Err("no such template section", { code: 404, description: "Template Section " + id + " not found", errors: []}));
      }
      
      _.assign(section, sectionData);
      self.validate(section, function(err, section) {
        if (err) { done(client); return callback(Err("validation error", { code: 2001, description: "template section validation error", errors: err})); }

        client.query("UPDATE t_sections SET name=$1 WHERE id=$2 RETURNING id", [section.name, section.id], function(err, result) {
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

TSectionProvider.prototype.remove = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("DELETE FROM t_sections WHERE id=$1 RETURNING id", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

TSectionProvider.prototype.removeAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("TRUNCATE t_sections", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

TSectionProvider.prototype.validate = function(section, callback) {
  let errors = [];

  async.parallel([
    function(next) {
      if (section.name) {
        if (!validator.isLength(section.name, 4, 255)) {
          errors.push({ param: 'name', msg: 'must have 4-255 chars', value: section.name });
        }
      }
      next();
    }
  ], function(err, results) {
    return (errors.length > 0) ? callback(errors) : callback(null, section);
  });
};

exports.TSectionProvider = TSectionProvider;
