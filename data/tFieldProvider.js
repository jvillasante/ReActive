'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const TFieldProvider = function(connStr) {
  this.connStr = connStr;
};

TFieldProvider.prototype.findAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name, field_type FROM t_fields", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TFieldProvider.prototype.findByName = function(name, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name, field_type FROM t_fields WHERE name=$1", [name], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TFieldProvider.prototype.findById = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name, field_type FROM t_fields WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

TFieldProvider.prototype.save = function(field, callback) {
  let self = this;
  
  this.validate(field, function(err, field) {
    if (err) { return callback(Err("validation error", { code: 2001, description: "template field validation error", errors: err})); }

    db.connect(self.connStr, function(err, client, done) {
      if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

      if (field.id) {
        client.query("INSERT INTO t_fields(id, name, field_type) VALUES($1, $2, $3) RETURNING id", 
        [field.id, field.name, field.field_type], function(err, result) {
          if (err) { 
            done(client);
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      } else {
        client.query("INSERT INTO t_fields(name, field_type) VALUES($1, $2) RETURNING id", [field.name, field.field_type], function(err, result) {
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

TFieldProvider.prototype.update = function(id, fieldData, callback) {
  let self = this;
  
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name, field_type FROM t_fields WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      let field = result.rows[0];
      if (!field) {
        done(client); 
        return callback(Err("no such template field", { code: 404, description: "Template Field " + id + " not found", errors: []}));
      }
      
      _.assign(field, fieldData);
      self.validate(field, function(err, field) {
        if (err) { done(client); return callback(Err("validation error", { code: 2001, description: "template field validation error", errors: err})); }

        client.query("UPDATE t_fields SET name=$1, field_type=$2 WHERE id=$3 RETURNING id", 
        [field.name, field.field_type, field.id], function(err, result) {
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

TFieldProvider.prototype.remove = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("DELETE FROM t_fields WHERE id=$1 RETURNING id", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

TFieldProvider.prototype.removeAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("TRUNCATE t_fields", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

TFieldProvider.prototype.validate = function(field, callback) {
  let errors = [];

  async.parallel([
    function(next) {
      if (field.name) {
        if (!validator.isLength(field.name, 2, 255)) {
          errors.push({ param: 'name', msg: 'must have 2-255 chars', value: field.name });
        }
      }
      next();
    },
    function(next) {
      if (field.field_type) {
        if (!validator.isIn(field.field_type, ['string', 'int', 'boolean', 'date'])) {
          errors.push({ param: 'field_type', msg: 'must be one of (string, int, boolean, date)', value: field.field_type });
        }
      }    
      next();
    }
  ], function(err, results) {
    return (errors.length > 0) ? callback(errors) : callback(null, field);
  });
};

exports.TFieldProvider = TFieldProvider;
