'use strict';

const 
  bcrypt = require('bcrypt'),
  ROUNDS = 10;

exports.hash = function(value, callback) {
  bcrypt.hash(value, ROUNDS, function(err, hash) {
    if (err) { return callback(err); }
    callback(null, hash);
  });
};

exports.compare = function(value, hashed, callback) {
  bcrypt.compare(value, hashed, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};
