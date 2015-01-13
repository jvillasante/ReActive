'use strict';

const pg = require('pg').native;

pg.defaults.poolSize = 1000;

exports.connect = function(connStr, callback) {
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      done(client);
      return callback(err);
    } 

    callback(null, client, done);
  });
};

exports.disconnect = function() {
  pg.end();
};


