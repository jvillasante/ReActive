'use strict';

const
  async = require('async'),
  faker = require('faker'),
  TSectionProvider = require('../data/tSectionProvider').TSectionProvider,
  config = require('../config.json').development,
  tSectionProvider = new TSectionProvider(config.connectionStr),
  uuids = require('./uuids').tsections;

faker.locale = "es";

exports.createSections = function(callback) {
  let i, sections = [];

  for (i = 0; i < 10; i++) {
    sections.push({
      id: uuids[i],
      name: faker.lorem.sentence()
    });
  }

  tSectionProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.each(sections, function(section, cb) {
      tSectionProvider.save(section, function(err, result) {
        cb(err);
      });
    }, function(err) {
      callback(err);
    });
  });
};

