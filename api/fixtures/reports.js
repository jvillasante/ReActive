'use strict';

const
  _ = require('lodash'),
  async = require('async'),
  faker = require('faker'),
  ReportProvider = require('../data/reportProvider').ReportProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  reportProvider = new ReportProvider(config.connectionStr),
  uuids = require('./uuids'),
  userId = require('./uuids').users[0];

faker.locale = "es";

let random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
let yesno = ['Si', 'No', 'N/A'];

function getReports(number) {
  let reports = [];

  uuids.projects.forEach(function(projectId) {
    _.times(5, function(_) {
      let date = new Date(2015, random(0, 12), random(1, 28));
      if (number === 1) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: random(1, 101) },
            { item: 2, value: random(1, 101) },
            { item: 3, value: random(1, 101) },
            { item: 4, value: random(1, 101) },
            { item: 5, value: random(1, 101) },
            { item: 6, value: random(1, 101) },
            { item: 7, value: random(1, 101) },
            { item: 8, value: random(1, 101) },
            { item: 9, value: random(1, 101) },
            { item: 10, value: random(1, 101) },
            { item: 11, value: random(1, 101) },
            { item: 12, value: random(1, 101) },
            { item: 13, value: random(1, 101) },
            { item: 14, value: random(1, 101) },
            { item: 15, value: random(1, 101) },
            { item: 16, value: random(1, 101) },
            { item: 17, value: random(1, 101) },
            { item: 18, value: random(1, 101) },
            { item: 19, value: random(1, 101) },
            { item: 20, value: random(1, 101) },
            { item: 21, value: random(1, 101) },
            { item: 22, value: random(1, 101) }
          ]
        });
      } else if (number === 2) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 3)] },
            { item: 2, value: yesno[random(0, 3)] },
            { item: 3, value: yesno[random(0, 3)] },
            { item: 4, value: yesno[random(0, 3)] },
            { item: 5, value: yesno[random(0, 3)] },
            { item: 6, value: yesno[random(0, 3)] },
            { item: 7, value: yesno[random(0, 3)] },
            { item: 8, value: yesno[random(0, 3)] },
            { item: 9, value: yesno[random(0, 3)] },
            { item: 10, value: yesno[random(0, 3)] },
            { item: 11, value: yesno[random(0, 3)] },
            { item: 12, value: yesno[random(0, 3)] },
            { item: 13, value: yesno[random(0, 3)] },
            { item: 14, value: yesno[random(0, 3)] },
            { item: 15, value: yesno[random(0, 3)] },
            { item: 16, value: yesno[random(0, 3)] },
            { item: 17, value: yesno[random(0, 3)] },
            { item: 18, value: yesno[random(0, 3)] },
            { item: 19, value: yesno[random(0, 3)] },
            { item: 20, value: yesno[random(0, 3)] },
            { item: 21, value: yesno[random(0, 3)] },
            { item: 22, value: yesno[random(0, 3)] },
            { item: 23, value: yesno[random(0, 3)] },
            { item: 24, value: yesno[random(0, 3)] },
            { item: 25, value: yesno[random(0, 3)] },
            { item: 26, value: yesno[random(0, 3)] },
            { item: 27, value: yesno[random(0, 3)] },
            { item: 28, value: yesno[random(0, 3)] },
            { item: 29, value: yesno[random(0, 3)] },
            { item: 30, value: yesno[random(0, 3)] },
            { item: 31, value: yesno[random(0, 3)] },
            { item: 32, value: yesno[random(0, 3)] },
            { item: 33, value: yesno[random(0, 3)] },
            { item: 34, value: yesno[random(0, 3)] },
            { item: 35, value: yesno[random(0, 3)] },
            { item: 36, value: yesno[random(0, 3)] },
            { item: 37, value: yesno[random(0, 3)] },
            { item: 38, value: yesno[random(0, 3)] },
            { item: 39, value: yesno[random(0, 3)] },
            { item: 40, value: yesno[random(0, 3)] },
            { item: 41, value: yesno[random(0, 3)] },
            { item: 42, value: yesno[random(0, 3)] },
            { item: 43, value: yesno[random(0, 3)] },
            { item: 44, value: yesno[random(0, 3)] },
            { item: 45, value: yesno[random(0, 3)] },
            { item: 46, value: yesno[random(0, 3)] },
            { item: 47, value: yesno[random(0, 3)] },
            { item: 48, value: yesno[random(0, 3)] },
            { item: 49, value: yesno[random(0, 3)] },
            { item: 50, value: yesno[random(0, 3)] },
            { item: 51, value: yesno[random(0, 3)] },
            { item: 52, value: yesno[random(0, 3)] },
            { item: 53, value: yesno[random(0, 3)] },
            { item: 54, value: yesno[random(0, 3)] },
            { item: 55, value: yesno[random(0, 3)] },
            { item: 56, value: yesno[random(0, 3)] },
            { item: 57, value: yesno[random(0, 3)] },
            { item: 58, value: yesno[random(0, 3)] },
            { item: 59, value: yesno[random(0, 3)] },
            { item: 60, value: yesno[random(0, 3)] },
            { item: 61, value: yesno[random(0, 3)] },
            { item: 62, value: yesno[random(0, 3)] },
            { item: 63, value: yesno[random(0, 3)] },
            { item: 64, value: yesno[random(0, 3)] },
            { item: 65, value: yesno[random(0, 3)] },
            { item: 66, value: yesno[random(0, 3)] },
            { item: 67, value: yesno[random(0, 3)] },
            { item: 68, value: yesno[random(0, 3)] },
            { item: 69, value: yesno[random(0, 3)] },
            { item: 70, value: yesno[random(0, 3)] },
            { item: 71, value: yesno[random(0, 3)] },
            { item: 72, value: yesno[random(0, 3)] },
            { item: 73, value: yesno[random(0, 3)] },
            { item: 74, value: yesno[random(0, 3)] },
            { item: 75, value: yesno[random(0, 3)] },
            { item: 76, value: yesno[random(0, 3)] },
            { item: 77, value: yesno[random(0, 3)] },
            { item: 78, value: yesno[random(0, 3)] },
            { item: 79, value: yesno[random(0, 3)] },
            { item: 80, value: yesno[random(0, 3)] },
            { item: 81, value: yesno[random(0, 3)] },
            { item: 82, value: yesno[random(0, 3)] },
            { item: 83, value: yesno[random(0, 3)] },
            { item: 84, value: yesno[random(0, 3)] },
            { item: 85, value: yesno[random(0, 3)] },
            { item: 86, value: yesno[random(0, 3)] },
            { item: 87, value: yesno[random(0, 3)] },
            { item: 88, value: yesno[random(0, 3)] },
            { item: 89, value: yesno[random(0, 3)] },
            { item: 90, value: yesno[random(0, 3)] },
            { item: 91, value: yesno[random(0, 3)] },
            { item: 92, value: yesno[random(0, 3)] },
            { item: 93, value: yesno[random(0, 3)] },
          ]
        });
      }
    });
  });

  return reports;
}

exports.create = function(callback) {
  reportProvider.removeAll(function(err) {
    if (err) { console.log(err); throw err; }

    async.parallel([
      function(next) {
        let reports = getReports(1);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      },
      function(next) {
        let reports = getReports(2);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      }
    ], function(err, results) {
      callback(err);
    });
  });
};

exports.removeAll = function(callback) {
  reportProvider.removeAll(callback);
};
