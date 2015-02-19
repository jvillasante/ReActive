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

exports.create = function(callback) {
  let i, projects = [
    { id: uuids[0], id_user: user_id, name: 'Aguas Claras - Etapa 01', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[1], id_user: user_id, name: 'Haras de Machalí - Etapa 05', address: "Machalí, IX Región", image: "http://gestion.enlaceinmobiliario.cl/cache/4f3e7242b37b27_fachada.jpg.png" },
    { id: uuids[2], id_user: user_id, name: 'Edificios de Hacienda - Etapa 1', address: "Piedra Roja, Chicureo, RM", image: "http://www.piedraroja.cl/slides/edificios-hacienda.jpg" },
    { id: uuids[3], id_user: user_id, name: 'Cumbres - Torre D', address: "Santa María de Manquehue, Vitacura, Santiago", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014121638293369179.jpg" },
    { id: uuids[4], id_user: user_id, name: 'Cumbres - Torre E', address: "Santa María de Manquehue, Vitacura, Santiago", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014121638293369179.jpg" },
    { id: uuids[5], id_user: user_id, name: 'Estancia Liray - Etapa 8.2', address: "Colina, Chacabuco, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2011101718359062500.JPG" },
    { id: uuids[6], id_user: user_id, name: 'Campo de Machalí - Etapa 01', address: "Machalí, IX Región", image: "http://gestion.enlaceinmobiliario.cl/cache/538655d7519529_CEDRO.jpg.png" },
    { id: uuids[7], id_user: user_id, name: 'Montepiedra - Etapa 3', address: "Piedra Roja, Chicureo, RM", image: "http://www.dconstruccion.cl/wp-content/uploads/montepiedra.jpg" },
    { id: uuids[8], id_user: user_id, name: 'Cumbres - Torre C', address: "Santa María de Manquehue, Vitacura, Santiago", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014121638293369179.jpg" },
    { id: uuids[9], id_user: user_id, name: 'Los Maderos - Etapa 03', address: "Piedra Roja, Chicureo, RM", image: "http://www.propiedades.emol.com/images/noticias/Los%20maderos%20%20small.jpg" },
    { id: uuids[10], id_user: user_id, name: 'Casas de Hacienda - Etapa 3', address: "Piedra Roja, Chicureo, RM", image: "api/public/images/no-image.png" },
    { id: uuids[11], id_user: user_id, name: 'Visita Los Bosques - Etapa 1', address: "Piedra Roja, Chicureo, RM", image: "http://static.toctoc.com/fotos/20140724/262372/n_wm_2014072402042805684.jpg" },
    { id: uuids[12], id_user: user_id, name: 'Montepiedra - Etapa 2', address: "Piedra Roja, Chicureo, RM", image: "http://www.dconstruccion.cl/wp-content/uploads/montepiedra.jpg" },
    { id: uuids[13], id_user: user_id, name: 'Haras de Machalí - Etapa 04', address: "Machalí, IX Región", image: "http://gestion.enlaceinmobiliario.cl/cache/4f3e7242b37b27_fachada.jpg.png" },
    { id: uuids[14], id_user: user_id, name: 'Los Maderos - Etapa 02', address: "Piedra Roja, Chicureo, RM", image: "http://www.propiedades.emol.com/images/noticias/Los%20maderos%20%20small.jpg" },
    { id: uuids[15], id_user: user_id, name: 'Agustín del Castillo - Etapa 1', address: "Agustin del Castillo Nº2860, Vitacura, RM", image: "api/public/images/no-image.png" }
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
