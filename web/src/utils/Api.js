'use strict';

var API_ROOT = require('../config').production.apiRoot;
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
            token: res.body.token
          });
        } else {
          failure('Error autenticando usuario. Verifique usuario y contraseña.');
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
          failure('Error obteniendo proyectos de la base de datos. Intentelo de nuevo en unos minutos.');
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
          failure('Error obteniendo proyectos de la base de datos. Intentelo de nuevo en unos minutos.');
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
          failure('Error obteniendo proyectos de la base de datos. Intentelo de nuevo en unos minutos.');
        }
      });
  }
};
