'use strict';

const
  async = require('async'),
  faker = require('faker'),
  TemplateProvider = require('../data/templateProvider').TemplateProvider,
  config = require('../config.json').development,
  templateProvider = new TemplateProvider(config.connectionStr),
  uuids = require('./uuids').templates;

faker.locale = "es";

exports.createTemplates = function(callback) {
  let i, templates = [];

  for (i = 0; i < 10; i++) {
    templates.push({
      id: uuids[i],
      name: faker.lorem.sentence()
    });
  }

  templateProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.each(templates, function(template, cb) {
      templateProvider.save(template, function(err, result) {
        cb(err);
      });
    }, function(err) {
      callback(err);
    });
  });
};

