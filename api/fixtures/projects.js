'use strict';

const
  async = require('async'),
  faker = require('faker'),
  ProjectProvider = require('../data/projectProvider').ProjectProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  projectProvider = new ProjectProvider(config.connectionStr),
  uuids = require('./uuids').projects,
  user_id = require('./uuids').users[0];

faker.locale = "es";

exports.createProjects = function(callback) {
  let i, projects = [
    { id: uuids[0], id_user: user_id, name: 'Agustín del Castillo - Etapa 1', address: faker.address.streetAddress() },
    { id: uuids[1], id_user: user_id, name: 'Visita Los Bosques - Etapa 1', address: faker.address.streetAddress() },
    { id: uuids[2], id_user: user_id, name: 'Montepiedra - Etapa 2', address: faker.address.streetAddress() },
    { id: uuids[3], id_user: user_id, name: 'Montepiedra - Etapa 3', address: faker.address.streetAddress() },
    { id: uuids[4], id_user: user_id, name: 'Los Maderos - Etapa 02', address: faker.address.streetAddress() },
    { id: uuids[5], id_user: user_id, name: 'Los Maderos - Etapa 03', address: faker.address.streetAddress() },
    { id: uuids[6], id_user: user_id, name: 'Aguas Claras - Etapa 01', address: faker.address.streetAddress() },
    { id: uuids[7], id_user: user_id, name: 'Haras de Machelí - Etapa 04', address: faker.address.streetAddress() },
    { id: uuids[8], id_user: user_id, name: 'Haras de Machelí - Etapa 05', address: faker.address.streetAddress() },
    { id: uuids[9], id_user: user_id, name: 'Campo de Machelí - Etapa 01', address: faker.address.streetAddress() },
    { id: uuids[10], id_user: user_id, name: 'Estancia Liray - Etapa 8.2', address: faker.address.streetAddress() },
    { id: uuids[11], id_user: user_id, name: 'Cumbres - Torre C', address: faker.address.streetAddress() },
    { id: uuids[12], id_user: user_id, name: 'Cumbres - Torre D', address: faker.address.streetAddress() },
    { id: uuids[13], id_user: user_id, name: 'Cumbres - Torre E', address: faker.address.streetAddress() },
    { id: uuids[14], id_user: user_id, name: 'Casas de Hacienda - Etapa 3', address: faker.address.streetAddress() },
    { id: uuids[15], id_user: user_id, name: 'Edificios de Hacienda - Etapa 1', address: faker.address.streetAddress() }
  ];

  projectProvider.removeAll(function(err) {
    if (err) { throw err; }

    async.each(projects, function(project, cb) {
      projectProvider.save(project, function(err, result) {
        cb(err);
      });
    }, function(err) {
      callback(err);
    });
  });
};

exports.removeAll = function(callback) {
  projectProvider.removeAll(callback);
};
