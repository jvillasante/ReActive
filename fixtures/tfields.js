'use strict';

const
  async = require('async'),
  faker = require('faker'),
  TFieldProvider = require('../data/tFieldProvider').TFieldProvider,
  config = require('../config.json').development,
  tFieldProvider = new TFieldProvider(config.connectionStr),
  uuids = require('./uuids').tfields;

faker.locale = "es";

exports.createFields = function(callback) {
  let i, fields = [], types = ['string', 'int', 'boolean', 'date'];

  for (i = 0; i < 10; i++) {
    fields.push({
      id: uuids[i],
      name: faker.lorem.words()[0],
      field_type: types[Math.floor(Math.random() * types.length)]
    });
  }

  tFieldProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.each(fields, function(field, cb) {
      tFieldProvider.save(field, function(err, result) {
        cb(err);
      });
    }, function(err) {
      callback(err);
    });
  });
};

