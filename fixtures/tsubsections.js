'use strict';

const
  async = require('async'),
  faker = require('faker'),
  TSubSectionProvider = require('../data/tSubSectionProvider').TSubSectionProvider,
  config = require('../config.json').development,
  tSubSectionProvider = new TSubSectionProvider(config.connectionStr),
  uuids = require('./uuids').tsubsections;

faker.locale = "es";

exports.createSections = function(callback) {
  let i, sections = [];

  for (i = 0; i < 10; i++) {
    sections.push({
      id: uuids[i],
      name: faker.lorem.sentence()
    });
  }

  tSubSectionProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.each(sections, function(section, cb) {
      tSubSectionProvider.save(section, function(err, result) {
        cb(err);
      });
    }, function(err) {
      callback(err);
    });
  });
};

