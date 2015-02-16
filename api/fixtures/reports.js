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
      } else if (number === 3) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 3)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 3)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 3)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 3)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 3)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 3)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 3)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 3)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 3)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 3)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 3)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 3)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 3)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 3)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 3)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 3)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 3)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 3)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 3)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 3)] },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: yesno[random(0, 3)] },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: yesno[random(0, 3)] },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: yesno[random(0, 3)] },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: yesno[random(0, 3)] },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: yesno[random(0, 3)] },
            { item: 50, value: faker.lorem.words().join(' ') },
            { item: 51, value: yesno[random(0, 3)] },
            { item: 52, value: faker.lorem.words().join(' ') },
            { item: 53, value: yesno[random(0, 3)] },
            { item: 54, value: faker.lorem.words().join(' ') },
            { item: 55, value: yesno[random(0, 3)] },
            { item: 56, value: faker.lorem.words().join(' ') },
            { item: 57, value: yesno[random(0, 3)] },
            { item: 58, value: faker.lorem.words().join(' ') },
            { item: 59, value: yesno[random(0, 3)] },
            { item: 60, value: faker.lorem.words().join(' ') },
            { item: 61, value: yesno[random(0, 3)] },
            { item: 62, value: faker.lorem.words().join(' ') },
            { item: 63, value: yesno[random(0, 3)] },
            { item: 64, value: faker.lorem.words().join(' ') },
            { item: 65, value: yesno[random(0, 3)] },
            { item: 66, value: faker.lorem.words().join(' ') },
            { item: 67, value: yesno[random(0, 3)] },
            { item: 68, value: faker.lorem.words().join(' ') },
            { item: 69, value: yesno[random(0, 3)] },
            { item: 70, value: faker.lorem.words().join(' ') },
            { item: 71, value: yesno[random(0, 3)] },
            { item: 72, value: faker.lorem.words().join(' ') },
            { item: 73, value: yesno[random(0, 3)] },
            { item: 74, value: faker.lorem.words().join(' ') },
            { item: 75, value: yesno[random(0, 3)] },
            { item: 76, value: faker.lorem.words().join(' ') },
            { item: 77, value: yesno[random(0, 3)] },
            { item: 78, value: faker.lorem.words().join(' ') },
            { item: 79, value: yesno[random(0, 3)] },
            { item: 80, value: faker.lorem.words().join(' ') },
            { item: 81, value: yesno[random(0, 3)] },
            { item: 82, value: faker.lorem.words().join(' ') },
            { item: 83, value: yesno[random(0, 3)] },
            { item: 84, value: faker.lorem.words().join(' ') },
            { item: 85, value: yesno[random(0, 3)] },
            { item: 86, value: faker.lorem.words().join(' ') },
            { item: 87, value: yesno[random(0, 3)] },
            { item: 88, value: faker.lorem.words().join(' ') },
            { item: 89, value: yesno[random(0, 3)] },
            { item: 90, value: faker.lorem.words().join(' ') },
            { item: 91, value: yesno[random(0, 3)] },
            { item: 92, value: faker.lorem.words().join(' ') },
            { item: 93, value: yesno[random(0, 3)] },
            { item: 94, value: faker.lorem.words().join(' ') },
            { item: 95, value: yesno[random(0, 3)] },
            { item: 96, value: faker.lorem.words().join(' ') },
            { item: 97, value: yesno[random(0, 3)] },
            { item: 98, value: faker.lorem.words().join(' ') },
          ]
        });
      } else if (number === 4) {
        throw "not implemented - bitacora";
      } else if (number === 5) {
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
          ]
        });
      } else if (number === 6) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 3)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 3)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 3)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 3)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 3)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 3)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 3)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 3)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 3)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 3)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 3)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 3)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 3)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 3)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 3)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 3)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 3)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 3)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 3)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 3)] },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: yesno[random(0, 3)] },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: yesno[random(0, 3)] },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: yesno[random(0, 3)] },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: yesno[random(0, 3)] },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: yesno[random(0, 3)] },
            { item: 50, value: faker.lorem.words().join(' ') },
            { item: 51, value: yesno[random(0, 3)] },
            { item: 52, value: faker.lorem.words().join(' ') },
            { item: 53, value: yesno[random(0, 3)] },
            { item: 54, value: faker.lorem.words().join(' ') },
            { item: 55, value: yesno[random(0, 3)] },
            { item: 56, value: faker.lorem.words().join(' ') },
            { item: 57, value: yesno[random(0, 3)] },
            { item: 58, value: faker.lorem.words().join(' ') },
            { item: 59, value: yesno[random(0, 3)] },
            { item: 60, value: faker.lorem.words().join(' ') },
            { item: 61, value: yesno[random(0, 3)] },
            { item: 62, value: faker.lorem.words().join(' ') },
            { item: 63, value: yesno[random(0, 3)] },
            { item: 64, value: faker.lorem.words().join(' ') },
            { item: 65, value: yesno[random(0, 3)] },
            { item: 66, value: faker.lorem.words().join(' ') },
            { item: 67, value: yesno[random(0, 3)] },
            { item: 68, value: faker.lorem.words().join(' ') },
            { item: 69, value: yesno[random(0, 3)] },
            { item: 70, value: faker.lorem.words().join(' ') },
            { item: 71, value: yesno[random(0, 3)] },
            { item: 72, value: faker.lorem.words().join(' ') },
            { item: 73, value: yesno[random(0, 3)] },
            { item: 74, value: faker.lorem.words().join(' ') },
            { item: 75, value: yesno[random(0, 3)] },
            { item: 76, value: faker.lorem.words().join(' ') },
            { item: 77, value: yesno[random(0, 3)] },
            { item: 78, value: faker.lorem.words().join(' ') },
          ]
        });
      } else if (number === 7) {
        throw "not a report - parent report";
      } else if (number === 8) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 3)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 3)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 3)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 3)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 3)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 3)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 3)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 3)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 3)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 3)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 3)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 3)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 3)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 3)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 3)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 3)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 3)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 3)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 3)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 3)] },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: yesno[random(0, 3)] },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: yesno[random(0, 3)] },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: yesno[random(0, 3)] },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: yesno[random(0, 3)] },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: yesno[random(0, 3)] },
            { item: 50, value: faker.lorem.words().join(' ') },
          ]
        });
      } else if (number === 9) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 3)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 3)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 3)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 3)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 3)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 3)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 3)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 3)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 3)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 3)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 3)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 3)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 3)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 3)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 3)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 3)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 3)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 3)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 3)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 3)] },
            { item: 40, value: faker.lorem.words().join(' ') },
          ]
        });
      } else if (number === 10) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 3)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 3)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 3)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 3)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 3)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 3)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 3)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 3)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 3)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 3)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 3)] },
            { item: 22, value: faker.lorem.words().join(' ') },
          ]
        });
      } else if (number === 11) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 3)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 3)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 3)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 3)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 3)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 3)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 3)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 3)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 3)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 3)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 3)] },
            { item: 22, value: yesno[random(0, 3)] },
            { item: 23, value: faker.lorem.words().join(' ') },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: faker.lorem.words().join(' ') },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: faker.lorem.words().join(' ') },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: faker.lorem.words().join(' ') },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: faker.lorem.words().join(' ') },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: faker.lorem.words().join(' ') },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: faker.lorem.words().join(' ') },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: faker.lorem.words().join(' ') },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: faker.lorem.words().join(' ') },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: faker.lorem.words().join(' ') },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: faker.lorem.words().join(' ') },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: faker.lorem.words().join(' ') },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: faker.lorem.words().join(' ') },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: faker.lorem.words().join(' ') },
            { item: 50, value: faker.lorem.words().join(' ') },
            { item: 51, value: faker.lorem.words().join(' ') },
            { item: 52, value: faker.lorem.words().join(' ') },
            { item: 53, value: faker.lorem.words().join(' ') },
            { item: 54, value: faker.lorem.words().join(' ') },
            { item: 55, value: faker.lorem.words().join(' ') },
            { item: 56, value: faker.lorem.words().join(' ') },
            { item: 57, value: faker.lorem.words().join(' ') },
            { item: 58, value: faker.lorem.words().join(' ') },
          ]
        });
      } else if (number === 12) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 3)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 3)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 3)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 3)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 3)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 3)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 3)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 3)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 3)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 3)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 3)] },
            { item: 22, value: yesno[random(0, 3)] },
            { item: 23, value: faker.lorem.words().join(' ') },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: faker.lorem.words().join(' ') },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: faker.lorem.words().join(' ') },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: faker.lorem.words().join(' ') },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: faker.lorem.words().join(' ') },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: faker.lorem.words().join(' ') },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: faker.lorem.words().join(' ') },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: faker.lorem.words().join(' ') },
            { item: 38, value: faker.lorem.words().join(' ') },
          ]
        });
      } else if (number === 13) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 2) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 3)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 3)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 3)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 3)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 3)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 3)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 3)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 3)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 3)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 3)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 3)] },
            { item: 22, value: yesno[random(0, 3)] },
            { item: 23, value: faker.lorem.words().join(' ') },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: faker.lorem.words().join(' ') },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: faker.lorem.words().join(' ') },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: faker.lorem.words().join(' ') },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: faker.lorem.words().join(' ') },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: faker.lorem.words().join(' ') },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: faker.lorem.words().join(' ') },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: faker.lorem.words().join(' ') },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 3)] },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: yesno[random(0, 3)] },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: yesno[random(0, 3)] },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: yesno[random(0, 3)] },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: yesno[random(0, 3)] },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: yesno[random(0, 3)] },
            { item: 50, value: faker.lorem.words().join(' ') },
            { item: 51, value: yesno[random(0, 3)] },
            { item: 52, value: faker.lorem.words().join(' ') },
            { item: 53, value: yesno[random(0, 3)] },
            { item: 54, value: faker.lorem.words().join(' ') },
            { item: 55, value: yesno[random(0, 3)] },
            { item: 56, value: faker.lorem.words().join(' ') },
            { item: 57, value: yesno[random(0, 3)] },
            { item: 58, value: faker.lorem.words().join(' ') },
            { item: 59, value: yesno[random(0, 3)] },
            { item: 60, value: yesno[random(0, 3)] },
            { item: 61, value: faker.lorem.words().join(' ') },
            { item: 62, value: faker.lorem.words().join(' ') },
            { item: 63, value: faker.lorem.words().join(' ') },
            { item: 64, value: faker.lorem.words().join(' ') },
            { item: 65, value: faker.lorem.words().join(' ') },
            { item: 66, value: faker.lorem.words().join(' ') },
            { item: 67, value: faker.lorem.words().join(' ') },
            { item: 68, value: faker.lorem.words().join(' ') },
            { item: 69, value: faker.lorem.words().join(' ') },
            { item: 70, value: faker.lorem.words().join(' ') },
            { item: 71, value: faker.lorem.words().join(' ') },
            { item: 72, value: faker.lorem.words().join(' ') },
            { item: 73, value: faker.lorem.words().join(' ') },
            { item: 74, value: faker.lorem.words().join(' ') },
            { item: 75, value: faker.lorem.words().join(' ') },
            { item: 76, value: faker.lorem.words().join(' ') },
            { item: 77, value: faker.lorem.words().join(' ') },
            { item: 78, value: faker.lorem.words().join(' ') },
            { item: 79, value: faker.lorem.words().join(' ') },
            { item: 80, value: faker.lorem.words().join(' ') },
            { item: 81, value: faker.lorem.words().join(' ') },
            { item: 82, value: faker.lorem.words().join(' ') },
            { item: 83, value: faker.lorem.words().join(' ') },
            { item: 84, value: faker.lorem.words().join(' ') },
            { item: 85, value: faker.lorem.words().join(' ') },
            { item: 86, value: faker.lorem.words().join(' ') },
            { item: 87, value: faker.lorem.words().join(' ') },
            { item: 88, value: faker.lorem.words().join(' ') },
            { item: 89, value: faker.lorem.words().join(' ') },
            { item: 90, value: faker.lorem.words().join(' ') },
            { item: 91, value: faker.lorem.words().join(' ') },
            { item: 92, value: faker.lorem.words().join(' ') },
            { item: 93, value: faker.lorem.words().join(' ') },
            { item: 94, value: faker.lorem.words().join(' ') },
            { item: 95, value: faker.lorem.words().join(' ') },
            { item: 96, value: faker.lorem.words().join(' ') },
            { item: 97, value: faker.lorem.words().join(' ') },
            { item: 98, value: faker.lorem.words().join(' ') },
            { item: 99, value: faker.lorem.words().join(' ') },
            { item: 100, value: faker.lorem.words().join(' ') },
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
      },
      function(next) {
        let reports = getReports(3);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      },
      function(next) {
        let reports = getReports(5);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      },
      function(next) {
        let reports = getReports(6);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      },
      function(next) {
        let reports = getReports(8);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      },
      function(next) {
        let reports = getReports(9);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      },
      function(next) {
        let reports = getReports(10);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      },
      function(next) {
        let reports = getReports(11);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      },
      function(next) {
        let reports = getReports(12);
        reports.forEach(function(report) {
          reportProvider.create(userId, report.projectId, report.templateId, report, function(err, result) {
            if (err) { next(err); }
          });
        });
        next();
      },
      function(next) {
        let reports = getReports(13);
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
