'use strict';

const
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db'),
  bcrypt = require('../lib/bcrypt');

const UserProvider = function(connStr) {
  this.connStr = connStr;
};

UserProvider.prototype.findAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, username, email, role, emp FROM users", function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

UserProvider.prototype.findByUsername = function(username, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, username, email, password, role, emp FROM users WHERE username=$1 LIMIT 1", [username], function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

UserProvider.prototype.findById = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, username, email, role, emp FROM users WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

UserProvider.prototype.save = function(user, callback) {
  let self = this;

  this.validate(user, function(err, user) {
    if (err) { return callback(Err("validation error", { code: 2001, description: "user validation error", errors: err})); }

    bcrypt.hash(user.password, function(err, hash) {
      if (err) { return callback(Err("hashing error", { code: 3001, description: err.message, errors: []})); }

      db.connect(self.connStr, function(err, client, done) {
        if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

        if (user.id) {
          client.query("INSERT INTO users(id, username, email, password, role, emp) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
            [user.id, user.username, user.email, hash, user.role, user.emp], function(err, result) {
            if (err) {
              done();
              return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
            }

            done();
            callback(null, result.rows[0]);
          });
        } else {
          client.query("INSERT INTO users(username, email, password, role, emp) VALUES($1, $2, $3, $4, $5) RETURNING id",
            [user.username, user.email, hash, user.role, user.emp], function(err, result) {
            if (err) {
              done();
              return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
            }

            done();
            callback(null, result.rows[0]);
          });
        }
      });
    });
  });
};

UserProvider.prototype.update = function(id, userData, callback) {
  let self = this;

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, username, email, password, role FROM users WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      let user = result.rows[0];
      if (!user) {
        done();
        return callback(Err("no such user", { code: 404, description: "User " + id + " not found", errors: []}));
      }

      _.assign(user, userData);
      self.validate(user, function(err, user) {
        if (err) { done(); return callback(Err("validation error", { code: 2001, description: "user validation error", errors: err})); }

        if (userData.password) {
          bcrypt.hash(user.password, function(err, hash) {
            if (err) { done(); return callback(Err("hashing error", { code: 3001, description: err.message, errors: []})); }

            client.query("UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING id",
              [user.username, user.email, hash, user.id], function(err, result) {
              if (err) {
                done();
                return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
              }

              done();
              callback(null, result.rows[0]);
            });
          });
        } else {
          client.query("UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING id",
            [user.username, user.email, user.id], function(err, result) {
            if (err) {
              done();
              return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
            }

            done();
            callback(null, result.rows[0]);
          });
        }
      });
    });
  });
};

UserProvider.prototype.remove = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("DELETE FROM users WHERE id=$1 RETURNING id", [id], function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

UserProvider.prototype.removeAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("TRUNCATE users CASCADE", function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

UserProvider.prototype.validate = function(user, callback) {
  let errors = [];

  async.parallel([
    function(next) {
      if (user.username) {
        if (!validator.isLength(user.username, 4, 255)) {
          errors.push({ param: 'username', msg: 'must have 4-255 chars', value: user.username });
        }
      }
      next();
    },
    function(next) {
      if (user.emp && !validator.isLength(user.emp, 2, 255)) {
        errors.push({ param: 'emp', msg: 'must be a valid emp name', value: user.emp});
      }
      next();
    },
    function(next) {
      if (user.email && !validator.isEmail(user.email)) {
        errors.push({ param: 'email', msg: 'must be a valid email address', value: user.email });
      }
      next();
    },
    function(next) {
      if (user.password && !validator.isLength(user.password, 6, 255)) {
        errors.push({ param: 'password', msg: 'must have 6-255 chars', value: '[hidden]' });
      }
      next();
    },
    function(next) {
      if (user.id && !validator.isUUID(user.id, 4)) {
        errors.push({ param: 'id', msg: 'must be a valid UUID version 4', value: user.id });
      }
      next();
    },
    function(next) {
      if (user.role && !validator.isIn(user.role, ["user", "admin"])) {
        errors.push({ param: 'role', msg: "must be one of ['user', 'admin']", value: user.role });
      }
      next();
    }
  ], function(err, results) {
    return (errors.length > 0) ? callback(errors) : callback(null, user);
  });
};

exports.UserProvider = UserProvider;
