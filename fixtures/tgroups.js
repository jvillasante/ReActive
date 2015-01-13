'use strict';

const
  async = require('async'),
  faker = require('faker'),
  TGroupProvider = require('../data/tGroupProvider').TGroupProvider,
  config = require('../config.json').development,
  tGroupProvider = new TGroupProvider(config.connectionStr),
  uuids = require('./uuids').tgroups;

faker.locale = "es";

exports.createGroups = function(callback) {
  let i, groups = [];

  for (i = 0; i < 10; i++) {
    groups.push({
      id: uuids[i],
      name: faker.lorem.sentence()
    });
  }

  tGroupProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.each(groups, function(group, cb) {
      tGroupProvider.save(group, function(err, result) {
        cb(err);
      });
    }, function(err) {
      callback(err);
    });
  });
};

