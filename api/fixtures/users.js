'use strict';

const
  async = require('async'),
  UserProvider = require('../data/userProvider').UserProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  userProvider = new UserProvider(config.connectionStr),
  uuids = require('./uuids').users;

exports.create = function(callback) {
  userProvider.removeAll(function(err) {
    if (err) { console.log(err); throw err; }

    let passwordAdmin = 'reactive-admin';
    let users = [
      // Manquehue
      {id: uuids[0], username: 'carlos.acuna', email: 'carlos.acuña@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/carlos.acuna.jpg'},
      {id: uuids[1], username: 'carolina.aguilera', email: 'carolina.aguilera@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/carolina.aguilera.jpg'},
      {id: uuids[2], username: 'carolina.mora', email: 'carolina.mora@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/no-image.png'},
      {id: uuids[3], username: 'christián.valdes', email: 'christián.valdes@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/christian.valdes.jpg'},
      {id: uuids[4], username: 'claudio.olivares', email: 'claudio.olivares@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/claudio.olivares.jpg'},
      {id: uuids[5], username: 'cristian.mella', email: 'cristian.mella@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/no-image.png'},
      {id: uuids[6], username: 'domingo.ramos', email: 'domingo.ramos@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/domingo.ramos.jpg'},
      {id: uuids[7], username: 'eduardo.vallejos', email: 'eduardo.vallejos@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/eduardo.vallejos.jpg'},
      {id: uuids[8], username: 'francisco.diazvaldes', email: 'francisco.diazvaldes@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/francisco.diazvaldes.jpg'},
      {id: uuids[9], username: 'francisco.riveros', email: 'francisco.riveros@imanquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/francisco.riveros.jpg'},
      {id: uuids[10], username: 'gonzalo.rementeria', email: 'gonzalo.rementeria@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/gonzalo.rementeria.jpg'},
      {id: uuids[11], username: 'henry.gonzalez', email: 'henry.gonzalez@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/henry.gonzalez.jpg'},
      {id: uuids[12], username: 'hernan.hernandez', email: 'hernan.hernandez@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/hernan.hernandez.jpg'},
      {id: uuids[13], username: 'hernan.rocco', email: 'hernan.rocco@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/hernan.rocco.jpg'},
      {id: uuids[14], username: 'ivan.sepulveda', email: 'ivan.sepulveda@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/ivan.sepulveda.jpg'},
      {id: uuids[15], username: 'jose.derodt', email: 'jose.derodt@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/jose.derodt.jpg'},
      {id: uuids[16], username: 'marcelo.jadue', email: 'marcelo.jadue@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/marcelo.jadue.jpg'},
      {id: uuids[17], username: 'mauricio.cerda', email: 'mauricio.cerda@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/mauricio.cerda.jpg'},
      {id: uuids[18], username: 'moises.caceres', email: 'moises.caceres@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/no-image.png'},
      {id: uuids[19], username: 'pablo.arnoff', email: 'pablo.arnoff@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/pablo.arnoff.jpg'},
      {id: uuids[20], username: 'patricio.bravo', email: 'patricio.bravo@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/patricio.bravo.jpg'},
      {id: uuids[21], username: 'ricardo.hierro', email: 'ricardo.hierro@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/ricardo.hierro.jpg'},
      {id: uuids[22], username: 'rodrigo.estay', email: 'rodrigo.estay@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/rodrigo.estay.jpg'},
      {id: uuids[23], username: 'rodrigo.valdivieso', email: 'rodrigo.valdivieso@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/rodrigo.valdivieso.jpg'},
      {id: uuids[24], username: 'francisco.labrin', email: 'francisco.labrin@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/francisco.labrin.jpg'},
      {id: uuids[25], username: 'pilar.oteiza', email: 'pilar.oteiza@manquehue.com', password: passwordAdmin, role: 'admin', emp: 'Manquehue', photo: 'api/public/images/users/pilar.oteiza.jpg'},

      // Empresa de Prueba
      {id: uuids[26], username: 'admin', email: 'admin@example.com', password: passwordAdmin, role: 'admin', emp: 'Empersa de Prueba', photo: 'api/public/images/no-image.png'},
    ];

    async.each(users, function(user, cb) {
      userProvider.save(user, cb);
    }, function(err) {
      callback(err);
    });
  });
};

exports.removeAll = function(callback) {
  userProvider.removeAll(callback);
};
