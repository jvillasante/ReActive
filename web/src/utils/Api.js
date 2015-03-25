'use strict';

// var API_ROOT = require('../config').production.apiRoot;
var API_ROOT = require('../config').development.apiRoot;
var superagent = require('superagent');
var SessionStore = require('../stores/SessionStore');

module.exports = {
  createSession: function(data, success, failure) {
    superagent
      .post(API_ROOT + '/login')
      .set('Accept', 'application/json')
      .send(data)
      .end(function(res) {
        if (res.ok) {
          success({
            username: res.body.username,
            email: res.body.email,
            role: res.body.role,
            emp: res.body.emp,
            token: res.body.token
          });
        } else {
          failure('Esto es embarazoso y no se supone que ocurra. Verifique usuario y contraseña.');
        }
      });
  },

  getProjects: function(success, failure) {
    superagent
      .get(API_ROOT + '/dashboard/projects')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + SessionStore.getToken())
      .end(function(res) {
        if (res.ok) {
          success({
            projects: res.body
          });
        } else {
          failure('Querido usuario, algo inesperado ha ocurrido. Es desconcertante y estamos trabajando para resolverlo. Error obteniendo proyectos.');
        }
      });
  },

  getProjectsData: function(start, end, projects, success, failure) {
    superagent
      .get(API_ROOT + '/dashboard/projects/data')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + SessionStore.getToken())
      .query({ start: start || '' })
      .query({ end: end || '' })
      .query({ projects: projects || '' })
      .end(function(res) {
        if (res.ok) {
          success({
            projects: res.body
          });
        } else {
          failure('Querido usuario, algo inesperado ha ocurrido. Es desconcertante y estamos trabajando para resolverlo. Error obteniendo proyectos.');
        }
      });
  },

  getProjectsDataForGraphic: function(tableNumber, start, end, project, success, failure) {
    superagent
      .get(API_ROOT + '/dashboard/projects/graphicData')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + SessionStore.getToken())
      .query({ start: start || '' })
      .query({ end: end || '' })
      .query({ project: project || '' })
      .query({ tableNumber: tableNumber || 1 })
      .end(function(res) {
        if (res.ok) {
          var result = res.body.map(function(row) {
            return {
              name: row.name,
              data: row.data.map(function(data) {
                var date = new Date(data[0]);
                return [Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()), Number(data[1])];
              })
            };
          });

          success({
            data: result
          });
        } else {
          failure('Querido usuario, algo inesperado ha ocurrido. Es desconcertante y estamos trabajando para resolverlo. Error obteniendo proyectos.');
        }
      });
  },

  getProjectsReports: function(templateId, col, start, end, project, success, failure) {
    superagent
      .get(API_ROOT + '/dashboard/projects/reports')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + SessionStore.getToken())
      .query({ templateId: templateId || 0 })
      .query({ col: col || 0 })
      .query({ start: start || '' })
      .query({ end: end || '' })
      .query({ project: project || '' })
      .end(function(res) {
        if (res.ok) {
          success({
            data: res.body
          });
        } else {
          failure('Querido usuario, algo inesperado ha ocurrido. Es desconcertante y estamos trabajando para resolverlo. Error obteniendo proyectos.');
        }
      });
  }
};
