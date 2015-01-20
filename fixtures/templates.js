'use strict';

const
  async = require('async'),
  TemplateProvider = require('../data/templateProvider').TemplateProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  templateProvider = new TemplateProvider(config.connectionStr);

exports.createTemplates = function(callback) {
  templateProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.times(5, function(n, cb) {
      let json = require('../data/templates/' + (n + 1) + '.json');
      templateProvider.save(json.id, json.title, json, cb);
    }, function(err) {
      callback(err); 
    });
  });
};

exports.removeAll = function(callback) {
  templateProvider.removeAll(callback);
};
