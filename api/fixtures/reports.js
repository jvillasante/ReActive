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
let randomFloat = function(minValue, maxValue, precision){
  if(typeof(precision) === 'undefined') { precision = 2; }
  return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue).toFixed(precision));
};
let yesno = ['Si', 'No', 'N/A'];
let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let day = now.getDate() - 1;

function getReports(number) {
  let reports = [];

  uuids.projects.forEach(function(projectId) {
    _.times(10, function(_) {
      let theMonth = random(0, month);
      let theDay = (theMonth === month) ? random(1, day) : random(1, 28);
      let date = new Date(year, theMonth, theDay);
      if (number === 1) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: random(10000000, 6000000000) },
            { item: 2, value: random(10000000, 6000000000) },
            { item: 3, value: random(1, 100) },
            { item: 4, value: random(1, 100) },
            { item: 5, value: randomFloat(10.0, 100.0) },  // here
            { item: 6, value: randomFloat(100.0, 800.0) },
            { item: 7, value: random(1, 200) },
            { item: 8, value: random(1, 200) },
            { item: 9, value: random(1, 200) },
            { item: 10, value: random(1, 200) },
            { item: 11, value: random(1, 100) },
            { item: 12, value: randomFloat(1000.0, 10000.0) },
            { item: 13, value: random(1000, 10000) },
            { item: 14, value: random(20000000, 60000000) },
            { item: 15, value: random(5000000, 60000000) },
            { item: 16, value: randomFloat(10000000.0, 100000000.0) },
            { item: 17, value: randomFloat(10000.0, 80000.0) },
            { item: 18, value: randomFloat(100000.0, 900000) },
            { item: 19, value: random(1, 100) },
            { item: 20, value: random(1, 100) },
            { item: 21, value: random(1, 100) },
            { item: 22, value: random(1, 100) }
          ]
        });
      } else if (number === 2 || number === 14) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: yesno[random(0, 2)] },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: yesno[random(0, 2)] },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: yesno[random(0, 2)] },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: yesno[random(0, 2)] },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: yesno[random(0, 2)] },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: yesno[random(0, 2)] },
            { item: 13, value: yesno[random(0, 2)] },
            { item: 14, value: yesno[random(0, 2)] },
            { item: 15, value: yesno[random(0, 2)] },
            { item: 16, value: yesno[random(0, 2)] },
            { item: 17, value: yesno[random(0, 2)] },
            { item: 18, value: yesno[random(0, 2)] },
            { item: 19, value: yesno[random(0, 2)] },
            { item: 20, value: yesno[random(0, 2)] },
            { item: 21, value: yesno[random(0, 2)] },
            { item: 22, value: yesno[random(0, 2)] },
            { item: 23, value: yesno[random(0, 2)] },
            { item: 24, value: yesno[random(0, 2)] },
            { item: 25, value: yesno[random(0, 2)] },
            { item: 26, value: yesno[random(0, 2)] },
            { item: 27, value: yesno[random(0, 2)] },
            { item: 28, value: yesno[random(0, 2)] },
            { item: 29, value: yesno[random(0, 2)] },
            { item: 30, value: yesno[random(0, 2)] },
            { item: 31, value: yesno[random(0, 2)] },
            { item: 32, value: yesno[random(0, 2)] },
            { item: 33, value: yesno[random(0, 2)] },
            { item: 34, value: yesno[random(0, 2)] },
            { item: 35, value: yesno[random(0, 2)] },
            { item: 36, value: yesno[random(0, 2)] },
            { item: 37, value: yesno[random(0, 2)] },
            { item: 38, value: yesno[random(0, 2)] },
            { item: 39, value: yesno[random(0, 2)] },
            { item: 40, value: yesno[random(0, 2)] },
            { item: 41, value: yesno[random(0, 2)] },
            { item: 42, value: yesno[random(0, 2)] },
            { item: 43, value: yesno[random(0, 2)] },
            { item: 44, value: yesno[random(0, 2)] },
            { item: 45, value: yesno[random(0, 2)] },
            { item: 46, value: yesno[random(0, 2)] },
            { item: 47, value: yesno[random(0, 2)] },
            { item: 48, value: yesno[random(0, 2)] },
            { item: 49, value: yesno[random(0, 2)] },
            { item: 50, value: yesno[random(0, 2)] },
            { item: 51, value: yesno[random(0, 2)] },
            { item: 52, value: yesno[random(0, 2)] },
            { item: 53, value: yesno[random(0, 2)] },
            { item: 54, value: yesno[random(0, 2)] },
            { item: 55, value: yesno[random(0, 2)] },
            { item: 56, value: yesno[random(0, 2)] },
            { item: 57, value: yesno[random(0, 2)] },
            { item: 58, value: yesno[random(0, 2)] },
            { item: 59, value: yesno[random(0, 2)] },
            { item: 60, value: yesno[random(0, 2)] },
            { item: 61, value: yesno[random(0, 2)] },
            { item: 62, value: yesno[random(0, 2)] },
            { item: 63, value: yesno[random(0, 2)] },
            { item: 64, value: yesno[random(0, 2)] },
            { item: 65, value: yesno[random(0, 2)] },
            { item: 66, value: yesno[random(0, 2)] },
            { item: 67, value: yesno[random(0, 2)] },
            { item: 68, value: yesno[random(0, 2)] },
            { item: 69, value: yesno[random(0, 2)] },
            { item: 70, value: yesno[random(0, 2)] },
            { item: 71, value: yesno[random(0, 2)] },
            { item: 72, value: yesno[random(0, 2)] },
            { item: 73, value: yesno[random(0, 2)] },
            { item: 74, value: yesno[random(0, 2)] },
            { item: 75, value: yesno[random(0, 2)] },
            { item: 76, value: yesno[random(0, 2)] },
            { item: 77, value: yesno[random(0, 2)] },
            { item: 78, value: yesno[random(0, 2)] },
            { item: 79, value: yesno[random(0, 2)] },
            { item: 80, value: yesno[random(0, 2)] },
            { item: 81, value: yesno[random(0, 2)] },
            { item: 82, value: yesno[random(0, 2)] },
            { item: 83, value: yesno[random(0, 2)] },
            { item: 84, value: yesno[random(0, 2)] },
            { item: 85, value: yesno[random(0, 2)] },
            { item: 86, value: yesno[random(0, 2)] },
            { item: 87, value: yesno[random(0, 2)] },
            { item: 88, value: yesno[random(0, 2)] },
            { item: 89, value: yesno[random(0, 2)] },
            { item: 90, value: yesno[random(0, 2)] },
            { item: 91, value: yesno[random(0, 2)] },
            { item: 92, value: yesno[random(0, 2)] },
            { item: 93, value: yesno[random(0, 2)] },
          ]
        });
      } else if (number === 3) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 2)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 2)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 2)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 2)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 2)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 2)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 2)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 2)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 2)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 2)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 2)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 2)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 2)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 2)] },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: yesno[random(0, 2)] },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: yesno[random(0, 2)] },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: yesno[random(0, 2)] },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: yesno[random(0, 2)] },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: yesno[random(0, 2)] },
            { item: 50, value: faker.lorem.words().join(' ') },
            { item: 51, value: yesno[random(0, 2)] },
            { item: 52, value: faker.lorem.words().join(' ') },
            { item: 53, value: yesno[random(0, 2)] },
            { item: 54, value: faker.lorem.words().join(' ') },
            { item: 55, value: yesno[random(0, 2)] },
            { item: 56, value: faker.lorem.words().join(' ') },
            { item: 57, value: yesno[random(0, 2)] },
            { item: 58, value: faker.lorem.words().join(' ') },
            { item: 59, value: yesno[random(0, 2)] },
            { item: 60, value: faker.lorem.words().join(' ') },
            { item: 61, value: yesno[random(0, 2)] },
            { item: 62, value: faker.lorem.words().join(' ') },
            { item: 63, value: yesno[random(0, 2)] },
            { item: 64, value: faker.lorem.words().join(' ') },
            { item: 65, value: yesno[random(0, 2)] },
            { item: 66, value: faker.lorem.words().join(' ') },
            { item: 67, value: yesno[random(0, 2)] },
            { item: 68, value: faker.lorem.words().join(' ') },
            { item: 69, value: yesno[random(0, 2)] },
            { item: 70, value: faker.lorem.words().join(' ') },
            { item: 71, value: yesno[random(0, 2)] },
            { item: 72, value: faker.lorem.words().join(' ') },
            { item: 73, value: yesno[random(0, 2)] },
            { item: 74, value: faker.lorem.words().join(' ') },
            { item: 75, value: yesno[random(0, 2)] },
            { item: 76, value: faker.lorem.words().join(' ') },
            { item: 77, value: yesno[random(0, 2)] },
            { item: 78, value: faker.lorem.words().join(' ') },
            { item: 79, value: yesno[random(0, 2)] },
            { item: 80, value: faker.lorem.words().join(' ') },
            { item: 81, value: yesno[random(0, 2)] },
            { item: 82, value: faker.lorem.words().join(' ') },
            { item: 83, value: yesno[random(0, 2)] },
            { item: 84, value: faker.lorem.words().join(' ') },
            { item: 85, value: yesno[random(0, 2)] },
            { item: 86, value: faker.lorem.words().join(' ') },
            { item: 87, value: yesno[random(0, 2)] },
            { item: 88, value: faker.lorem.words().join(' ') },
            { item: 89, value: yesno[random(0, 2)] },
            { item: 90, value: faker.lorem.words().join(' ') },
            { item: 91, value: yesno[random(0, 2)] },
            { item: 92, value: faker.lorem.words().join(' ') },
            { item: 93, value: yesno[random(0, 2)] },
            { item: 94, value: faker.lorem.words().join(' ') },
            { item: 95, value: yesno[random(0, 2)] },
            { item: 96, value: faker.lorem.words().join(' ') },
            { item: 97, value: yesno[random(0, 2)] },
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
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: yesno[random(0, 2)] },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: yesno[random(0, 2)] },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: yesno[random(0, 2)] },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: yesno[random(0, 2)] },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: yesno[random(0, 2)] },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: yesno[random(0, 2)] },
            { item: 13, value: yesno[random(0, 2)] },
          ]
        });
      } else if (number === 6) {
        reports.push({
          createdAt: date,
          updatedAt: date,
          projectId: projectId,
          templateId: number,
          title: faker.lorem.words().join(' '),
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 2)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 2)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 2)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 2)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 2)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 2)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 2)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 2)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 2)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 2)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 2)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 2)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 2)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 2)] },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: yesno[random(0, 2)] },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: yesno[random(0, 2)] },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: yesno[random(0, 2)] },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: yesno[random(0, 2)] },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: yesno[random(0, 2)] },
            { item: 50, value: faker.lorem.words().join(' ') },
            { item: 51, value: yesno[random(0, 2)] },
            { item: 52, value: faker.lorem.words().join(' ') },
            { item: 53, value: yesno[random(0, 2)] },
            { item: 54, value: faker.lorem.words().join(' ') },
            { item: 55, value: yesno[random(0, 2)] },
            { item: 56, value: faker.lorem.words().join(' ') },
            { item: 57, value: yesno[random(0, 2)] },
            { item: 58, value: faker.lorem.words().join(' ') },
            { item: 59, value: yesno[random(0, 2)] },
            { item: 60, value: faker.lorem.words().join(' ') },
            { item: 61, value: yesno[random(0, 2)] },
            { item: 62, value: faker.lorem.words().join(' ') },
            { item: 63, value: yesno[random(0, 2)] },
            { item: 64, value: faker.lorem.words().join(' ') },
            { item: 65, value: yesno[random(0, 2)] },
            { item: 66, value: faker.lorem.words().join(' ') },
            { item: 67, value: yesno[random(0, 2)] },
            { item: 68, value: faker.lorem.words().join(' ') },
            { item: 69, value: yesno[random(0, 2)] },
            { item: 70, value: faker.lorem.words().join(' ') },
            { item: 71, value: yesno[random(0, 2)] },
            { item: 72, value: faker.lorem.words().join(' ') },
            { item: 73, value: yesno[random(0, 2)] },
            { item: 74, value: faker.lorem.words().join(' ') },
            { item: 75, value: yesno[random(0, 2)] },
            { item: 76, value: faker.lorem.words().join(' ') },
            { item: 77, value: yesno[random(0, 2)] },
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
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 2)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 2)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 2)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 2)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 2)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 2)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 2)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 2)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 2)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 2)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 2)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 2)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 2)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 2)] },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: yesno[random(0, 2)] },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: yesno[random(0, 2)] },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: yesno[random(0, 2)] },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: yesno[random(0, 2)] },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: yesno[random(0, 2)] },
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
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 2)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 2)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 2)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 2)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 2)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 2)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 2)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 2)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 2)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 2)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 2)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 2)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 2)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 2)] },
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
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 2)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 2)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 2)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 2)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 2)] },
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
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 2)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 2)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 2)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 2)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 2)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 2)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 2)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 2)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 2)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 2)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 2)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 2)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 2)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 2)] },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: yesno[random(0, 2)] },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: yesno[random(0, 2)] },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: yesno[random(0, 2)] },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: yesno[random(0, 2)] },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: yesno[random(0, 2)] },
            { item: 50, value: faker.lorem.words().join(' ') },
            { item: 51, value: yesno[random(0, 2)] },
            { item: 52, value: faker.lorem.words().join(' ') },
            { item: 53, value: yesno[random(0, 2)] },
            { item: 54, value: faker.lorem.words().join(' ') },
            { item: 55, value: yesno[random(0, 2)] },
            { item: 56, value: faker.lorem.words().join(' ') },
            { item: 57, value: yesno[random(0, 2)] },
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
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 2)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 2)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 2)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 2)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 2)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 2)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 2)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 2)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 2)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 2)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 2)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 2)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 2)] },
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
          sent: random(0, 1) ? true : false,
          fields: [
            { item: 1, value: yesno[random(0, 2)] },
            { item: 2, value: faker.lorem.words().join(' ') },
            { item: 3, value: yesno[random(0, 2)] },
            { item: 4, value: faker.lorem.words().join(' ') },
            { item: 5, value: yesno[random(0, 2)] },
            { item: 6, value: faker.lorem.words().join(' ') },
            { item: 7, value: yesno[random(0, 2)] },
            { item: 8, value: faker.lorem.words().join(' ') },
            { item: 9, value: yesno[random(0, 2)] },
            { item: 10, value: faker.lorem.words().join(' ') },
            { item: 11, value: yesno[random(0, 2)] },
            { item: 12, value: faker.lorem.words().join(' ') },
            { item: 13, value: yesno[random(0, 2)] },
            { item: 14, value: faker.lorem.words().join(' ') },
            { item: 15, value: yesno[random(0, 2)] },
            { item: 16, value: faker.lorem.words().join(' ') },
            { item: 17, value: yesno[random(0, 2)] },
            { item: 18, value: faker.lorem.words().join(' ') },
            { item: 19, value: yesno[random(0, 2)] },
            { item: 20, value: faker.lorem.words().join(' ') },
            { item: 21, value: yesno[random(0, 2)] },
            { item: 22, value: faker.lorem.words().join(' ') },
            { item: 23, value: yesno[random(0, 2)] },
            { item: 24, value: faker.lorem.words().join(' ') },
            { item: 25, value: yesno[random(0, 2)] },
            { item: 26, value: faker.lorem.words().join(' ') },
            { item: 27, value: yesno[random(0, 2)] },
            { item: 28, value: faker.lorem.words().join(' ') },
            { item: 29, value: yesno[random(0, 2)] },
            { item: 30, value: faker.lorem.words().join(' ') },
            { item: 31, value: yesno[random(0, 2)] },
            { item: 32, value: faker.lorem.words().join(' ') },
            { item: 33, value: yesno[random(0, 2)] },
            { item: 34, value: faker.lorem.words().join(' ') },
            { item: 35, value: yesno[random(0, 2)] },
            { item: 36, value: faker.lorem.words().join(' ') },
            { item: 37, value: yesno[random(0, 2)] },
            { item: 38, value: faker.lorem.words().join(' ') },
            { item: 39, value: yesno[random(0, 2)] },
            { item: 40, value: faker.lorem.words().join(' ') },
            { item: 41, value: yesno[random(0, 2)] },
            { item: 42, value: faker.lorem.words().join(' ') },
            { item: 43, value: yesno[random(0, 2)] },
            { item: 44, value: faker.lorem.words().join(' ') },
            { item: 45, value: yesno[random(0, 2)] },
            { item: 46, value: faker.lorem.words().join(' ') },
            { item: 47, value: yesno[random(0, 2)] },
            { item: 48, value: faker.lorem.words().join(' ') },
            { item: 49, value: yesno[random(0, 2)] },
            { item: 50, value: faker.lorem.words().join(' ') },
            { item: 51, value: yesno[random(0, 2)] },
            { item: 52, value: faker.lorem.words().join(' ') },
            { item: 53, value: yesno[random(0, 2)] },
            { item: 54, value: faker.lorem.words().join(' ') },
            { item: 55, value: yesno[random(0, 2)] },
            { item: 56, value: faker.lorem.words().join(' ') },
            { item: 57, value: yesno[random(0, 2)] },
            { item: 58, value: faker.lorem.words().join(' ') },
            { item: 59, value: yesno[random(0, 2)] },
            { item: 60, value: faker.lorem.words().join(' ') },
            { item: 61, value: yesno[random(0, 2)] },
            { item: 62, value: faker.lorem.words().join(' ') },
            { item: 63, value: yesno[random(0, 2)] },
            { item: 64, value: faker.lorem.words().join(' ') },
            { item: 65, value: yesno[random(0, 2)] },
            { item: 66, value: faker.lorem.words().join(' ') },
            { item: 67, value: yesno[random(0, 2)] },
            { item: 68, value: faker.lorem.words().join(' ') },
            { item: 69, value: yesno[random(0, 2)] },
            { item: 70, value: faker.lorem.words().join(' ') },
            { item: 71, value: yesno[random(0, 2)] },
            { item: 72, value: faker.lorem.words().join(' ') },
            { item: 73, value: yesno[random(0, 2)] },
            { item: 74, value: faker.lorem.words().join(' ') },
            { item: 75, value: yesno[random(0, 2)] },
            { item: 76, value: faker.lorem.words().join(' ') },
            { item: 77, value: yesno[random(0, 2)] },
            { item: 78, value: faker.lorem.words().join(' ') },
            { item: 79, value: yesno[random(0, 2)] },
            { item: 80, value: faker.lorem.words().join(' ') },
            { item: 81, value: yesno[random(0, 2)] },
            { item: 82, value: faker.lorem.words().join(' ') },
            { item: 83, value: yesno[random(0, 2)] },
            { item: 84, value: faker.lorem.words().join(' ') },
            { item: 85, value: yesno[random(0, 2)] },
            { item: 86, value: faker.lorem.words().join(' ') },
            { item: 87, value: yesno[random(0, 2)] },
            { item: 88, value: faker.lorem.words().join(' ') },
            { item: 89, value: yesno[random(0, 2)] },
            { item: 90, value: faker.lorem.words().join(' ') },
            { item: 91, value: yesno[random(0, 2)] },
            { item: 92, value: faker.lorem.words().join(' ') },
            { item: 93, value: yesno[random(0, 2)] },
            { item: 94, value: faker.lorem.words().join(' ') },
            { item: 95, value: yesno[random(0, 2)] },
            { item: 96, value: faker.lorem.words().join(' ') },
            { item: 97, value: yesno[random(0, 2)] },
            { item: 98, value: faker.lorem.words().join(' ') },
            { item: 99, value: yesno[random(0, 2)] },
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
      },
      function(next) {
        let reports = getReports(14);
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
