'use strict';

const
  async = require('async'),
  TemplateProvider = require('../data/templateProvider').TemplateProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  templateProvider = new TemplateProvider(config.connectionStr);

exports.create = function(callback) {
  templateProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.times(14, function(n, cb) {
      let number = ((n + 1) < 10) ? '0' + (n + 1) : (n + 1);
      let json = require('../data/templates/' + number + '.json');
      templateProvider.save(json, cb);
    }, function(err) {
      callback(err);
    });
  });
};

exports.removeAll = function(callback) {
  templateProvider.removeAll(callback);
};
