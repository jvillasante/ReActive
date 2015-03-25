'use strict';

const
  jwt = require('jsonwebtoken'),
  SECRET = require('../config.json').secret,
  TOKEN_EXPIRATION = 60;

exports.sign = function(user) {
  // return jwt.sign({id: user.id, username: user.username, role: user.role}, SECRET, { expiresInMinutes: TOKEN_EXPIRATION });
  return jwt.sign({id: user.id, username: user.username, role: user.role, emp: user.emp}, SECRET);
};

exports.verify = function(token, callback) {
  jwt.verify(token, SECRET, function(err, decoded) {
    if (err) { return callback(err); }
    callback(null, decoded);
  });
};
