'use strict';

var API_ROOT = "http://reactive.innobis.cl/api/v1";
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
      .get(API_ROOT + '/all/projects')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + SessionStore.getToken())
      .send()
      .end(function(res) {
        if (res.ok) {
          success({
            projects: res.body
          });
        } else {
          failure('Error obteniendo proyectos de la base de datos. Intentelo de nuevo en unos minutos.');
        }
      });
  }
};
