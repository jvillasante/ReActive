'use strict';

const pg = require('pg').native;

pg.defaults.poolSize = 50;

exports.connect = function(connStr, callback) {
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    callback(null, client, done);
  });
};

exports.disconnect = function() {
  pg.end();
};


