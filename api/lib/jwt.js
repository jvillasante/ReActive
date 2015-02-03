'use strict';

const
  JWT = require('jwt-async'),
  secret = '10f0975d-68bd-4d54-848a-fd3a3c95879c',
  jwt = new JWT();

jwt.setSecret(secret);

exports.encode = function(payload, callback) {
  jwt.sign(payload, function(err, data) {
    if (err) { return callback(err); }
    callback(null, data);
  });
};

exports.decode = function(token, callback) {
  jwt.verify(token, function(err, data) {
    if (err) { return callback(err); }
    callback(null, data);
  });
};
