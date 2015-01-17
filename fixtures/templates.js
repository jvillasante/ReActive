'use strict';

const
  async = require('async'),
  TemplateProvider = require('../data/templateProvider').TemplateProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  templateProvider = new TemplateProvider(config.connectionStr);

exports.createTemplates = function(callback) {
  templateProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.parallel([
      function(next) {
        let json = require('../data/templates/1.json');
        templateProvider.save(json.id, json.title, json, function(err, result) {
          next(err); 
        });
      },
      function(next) {
        let json = require('../data/templates/2.json');
        templateProvider.save(json.id, json.title, json, function(err, result) {
          next(err); 
        });
      },
      function(next) {
        let json = require('../data/templates/3.json');
        templateProvider.save(json.id, json.title, json, function(err, result) {
          next(err); 
        });
      }
    ], function(err, results) {
      callback(err);
    });
  });
};

