'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const TGroupProvider = function(connStr) {
  this.connStr = connStr;
};

TGroupProvider.prototype.findAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name FROM t_groups", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TGroupProvider.prototype.findByName = function(name, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name FROM t_groups WHERE name=$1", [name], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TGroupProvider.prototype.findById = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name FROM t_groups WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

TGroupProvider.prototype.save = function(group, callback) {
  let self = this;
  
  this.validate(group, function(err, group) {
    if (err) { return callback(Err("validation error", { code: 2001, description: "template group validation error", errors: err})); }

    db.connect(self.connStr, function(err, client, done) {
      if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

      if (group.id) {
        client.query("INSERT INTO t_groups(id, name) VALUES($1, $2) RETURNING id", [group.id, group.name], function(err, result) {
          if (err) { 
            done(client);
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      } else {
        client.query("INSERT INTO t_groups(name) VALUES($1) RETURNING id", [group.name], function(err, result) {
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

TGroupProvider.prototype.update = function(id, groupData, callback) {
  let self = this;
  
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name FROM t_group WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      let group = result.rows[0];
      if (!group) {
        done(client); 
        return callback(Err("no such template group", { code: 404, description: "Template group " + id + " not found", errors: []}));
      }
      
      _.assign(group, groupData);
      self.validate(group, function(err, group) {
        if (err) { done(client); return callback(Err("validation error", { code: 2001, description: "template group validation error", errors: err})); }

        client.query("UPDATE t_groups SET name=$1 WHERE id=$2 RETURNING id", [group.name, group.id], function(err, result) {
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

TGroupProvider.prototype.remove = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("DELETE FROM t_groups WHERE id=$1 RETURNING id", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

TGroupProvider.prototype.removeAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("TRUNCATE t_groups", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

TGroupProvider.prototype.validate = function(group, callback) {
  let errors = [];

  async.parallel([
    function(next) {
      if (group.name) {
        if (!validator.isLength(group.name, 4, 255)) {
          errors.push({ param: 'name', msg: 'must have 4-255 chars', value: group.name });
        }
      }
      next();
    }
  ], function(err, results) {
    return (errors.length > 0) ? callback(errors) : callback(null, group);
  });
};

exports.TGroupProvider = TGroupProvider;
