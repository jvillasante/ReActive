'use strict';

const
  async = require('async'),
  faker = require('faker'),
  ProjectProvider = require('../data/projectProvider').ProjectProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  projectProvider = new ProjectProvider(config.connectionStr),
  uuids = require('./uuids').projects,
  users = require('./uuids').users;

faker.locale = "es";

let random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.create = function(callback) {
  let projects = [
    // Manquehue
    { id: uuids[0], id_user: users[random(0, 25)], name: 'Maderos 5 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[1], id_user: users[random(0, 25)], name: 'Edificios de Hacienda 1 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[2], id_user: users[random(0, 25)], name: 'Edificios de Hacienda 2 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[3], id_user: users[random(0, 25)], name: 'Montepiedra 5 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[4], id_user: users[random(0, 25)], name: 'Vista Los Bosques 3 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[5], id_user: users[random(0, 25)], name: 'Aguas Claras 1 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[6], id_user: users[random(0, 25)], name: 'Aguas Claras 2 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[7], id_user: users[random(0, 25)], name: 'San Anselmo - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[8], id_user: users[random(0, 25)], name: 'Av Rabat - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[9], id_user: users[random(0, 25)], name: 'Estancia Liray 2.4 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[10], id_user: users[random(0, 25)], name: 'Estancia Liray 7 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[11], id_user: users[random(0, 25)], name: 'Estancia Liray 8.2 - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[12], id_user: users[random(0, 25)], name: 'Estancia Liray Ensanche San Martín - Auditoría Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[13], id_user: users[random(0, 25)], name: 'Maderos 5 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[14], id_user: users[random(0, 25)], name: 'Edificios de Hacienda 1 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[15], id_user: users[random(0, 25)], name: 'Edificios de Hacienda 2 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[16], id_user: users[random(0, 25)], name: 'Montepiedra 5 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[17], id_user: users[random(0, 25)], name: 'Vista Los Bosques 3 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[18], id_user: users[random(0, 25)], name: 'Aguas Claras 1 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[19], id_user: users[random(0, 25)], name: 'Aguas Claras 2 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[20], id_user: users[random(0, 25)], name: 'San Anselmo - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[21], id_user: users[random(0, 25)], name: 'Av Rabat - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[22], id_user: users[random(0, 25)], name: 'Estancia Liray 2.4 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[23], id_user: users[random(0, 25)], name: 'Estancia Liray 7 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[24], id_user: users[random(0, 25)], name: 'Estancia Liray 8.2 - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[25], id_user: users[random(0, 25)], name: 'Estancia Liray Ensanche San Martín - Urba', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[26], id_user: users[random(0, 25)], name: 'Campo Machalí 1 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[27], id_user: users[random(0, 25)], name: 'Haras 5 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[28], id_user: users[random(0, 25)], name: 'Campo Machalí 2 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[29], id_user: users[random(0, 25)], name: 'Rio Claro 1 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[30], id_user: users[random(0, 25)], name: 'Rio Malleco 1 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[31], id_user: users[random(0, 25)], name: 'Estancia 4.4 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[32], id_user: users[random(0, 25)], name: 'Estancia 8.2 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[33], id_user: users[random(0, 25)], name: 'Cumbres Torre D - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[34], id_user: users[random(0, 25)], name: 'Cumbres Torre E - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[35], id_user: users[random(0, 25)], name: 'Agustín del Castillo - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[36], id_user: users[random(0, 25)], name: 'Montepiedra 3 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[37], id_user: users[random(0, 25)], name: 'Maderos 3 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[38], id_user: users[random(0, 25)], name: 'Vista Los Bosques 2 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[39], id_user: users[random(0, 25)], name: 'Montepiedra 2 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[40], id_user: users[random(0, 25)], name: 'Montepiedra 4 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[41], id_user: users[random(0, 25)], name: 'Aguas Claras 1 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[42], id_user: users[random(0, 25)], name: 'Aguas Claras 2 - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[43], id_user: users[random(0, 25)], name: 'Agua Piedra - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[44], id_user: users[random(0, 25)], name: 'Los Robles - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[45], id_user: users[random(0, 25)], name: 'Casas de Hacienda - Auditoría Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[46], id_user: users[random(0, 25)], name: 'Campo Machalí 1 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[47], id_user: users[random(0, 25)], name: 'Haras 5 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[48], id_user: users[random(0, 25)], name: 'Campo Machalí 2 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[49], id_user: users[random(0, 25)], name: 'Rio Claro 1 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[50], id_user: users[random(0, 25)], name: 'Rio Malleco 1 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[51], id_user: users[random(0, 25)], name: 'Estancia 4.4 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[52], id_user: users[random(0, 25)], name: 'Estancia 8.2 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[53], id_user: users[random(0, 25)], name: 'Cumbres Torre D - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[54], id_user: users[random(0, 25)], name: 'Cumbres Torre E - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[55], id_user: users[random(0, 25)], name: 'Agustín del Castillo - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[56], id_user: users[random(0, 25)], name: 'Montepiedra 3 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[57], id_user: users[random(0, 25)], name: 'Maderos 3 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[58], id_user: users[random(0, 25)], name: 'Vista Los Bosques 2 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[59], id_user: users[random(0, 25)], name: 'Montepiedra 2 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[60], id_user: users[random(0, 25)], name: 'Montepiedra 4 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[61], id_user: users[random(0, 25)], name: 'Aguas Claras 1 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[62], id_user: users[random(0, 25)], name: 'Aguas Claras 2 - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[63], id_user: users[random(0, 25)], name: 'Agua Piedra - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[64], id_user: users[random(0, 25)], name: 'Los Robles - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[65], id_user: users[random(0, 25)], name: 'Casas de Hacienda - Ed', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[66], id_user: users[random(0, 25)], name: 'Bodega Post-Venta - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[67], id_user: users[random(0, 25)], name: 'Bodega Urbanización - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[68], id_user: users[random(0, 25)], name: 'Bodega Casas de Hacienda - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[69], id_user: users[random(0, 25)], name: 'Bodega Maderos 3 - Ed - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[70], id_user: users[random(0, 25)], name: 'Bodega Maderos 6 - Urba - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[71], id_user: users[random(0, 25)], name: 'Bodega Agustin del Castillo - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[72], id_user: users[random(0, 25)], name: 'Bodega Central - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[73], id_user: users[random(0, 25)], name: 'Cumbres Torre D - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[74], id_user: users[random(0, 25)], name: 'Cumbres Torre E - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[75], id_user: users[random(0, 25)], name: 'Estancia Liray 2.4 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[76], id_user: users[random(0, 25)], name: 'Estancia Liray 7 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[77], id_user: users[random(0, 25)], name: 'Estancia Liray 8.2 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[78], id_user: users[random(0, 25)], name: 'Estancia Liray Ensanche San Martín - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[79], id_user: users[random(0, 25)], name: 'Edificios de Hacienda 1 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[80], id_user: users[random(0, 25)], name: 'Edificios de Hacienda 2 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[81], id_user: users[random(0, 25)], name: 'Aguas Claras 1 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[82], id_user: users[random(0, 25)], name: 'Aguas Claras 2 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[83], id_user: users[random(0, 25)], name: 'Vista Los Bosques 2 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[84], id_user: users[random(0, 25)], name: 'Vista Los Bosques 3 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[85], id_user: users[random(0, 25)], name: 'Campo Machalí 1 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[86], id_user: users[random(0, 25)], name: 'Campo Machalí 2 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[87], id_user: users[random(0, 25)], name: 'Rio Claro 1 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[88], id_user: users[random(0, 25)], name: 'Rio Malleco 1 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[89], id_user: users[random(0, 25)], name: 'Haras 5 - Auditoría Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[90], id_user: users[random(0, 25)], name: 'Bodega Post-Venta - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[91], id_user: users[random(0, 25)], name: 'Bodega Urbanización - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[92], id_user: users[random(0, 25)], name: 'Bodega Casas de Hacienda - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[93], id_user: users[random(0, 25)], name: 'Bodega Maderos 3 - Ed - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[94], id_user: users[random(0, 25)], name: 'Bodega Maderos 6 - Urba - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[95], id_user: users[random(0, 25)], name: 'Bodega Agustin del Castillo - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[96], id_user: users[random(0, 25)], name: 'Bodega Central - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[97], id_user: users[random(0, 25)], name: 'Cumbres Torre D - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[98], id_user: users[random(0, 25)], name: 'Cumbres Torre E - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[99], id_user: users[random(0, 25)], name: 'Estancia Liray 2.4 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[100], id_user: users[random(0, 25)], name: 'Estancia Liray 7 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[101], id_user: users[random(0, 25)], name: 'Estancia Liray 8.2 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[102], id_user: users[random(0, 25)], name: 'Estancia Liray Ensanche San Martín - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[103], id_user: users[random(0, 25)], name: 'Edificios de Hacienda 1 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[104], id_user: users[random(0, 25)], name: 'Edificios de Hacienda 2 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[105], id_user: users[random(0, 25)], name: 'Aguas Claras 1 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[106], id_user: users[random(0, 25)], name: 'Aguas Claras 2 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[107], id_user: users[random(0, 25)], name: 'Vista Los Bosques 2 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[108], id_user: users[random(0, 25)], name: 'Vista Los Bosques 3 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[109], id_user: users[random(0, 25)], name: 'Campo Machalí 1 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[110], id_user: users[random(0, 25)], name: 'Campo Machalí 2 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[111], id_user: users[random(0, 25)], name: 'Rio Claro 1 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[112], id_user: users[random(0, 25)], name: 'Rio Malleco 1 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[113], id_user: users[random(0, 25)], name: 'Haras 5 - Bodega', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },

    // Empresa de Prueba
    { id: uuids[114], id_user: users[26], name: 'Proyecto de Prueba - Etapa 01', address: "Piedra Roja, Chicureo, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014031417235603501.jpg" },
    { id: uuids[115], id_user: users[26], name: 'Proyecto de Prueba - Etapa 02', address: "Machalí, IX Región", image: "http://gestion.enlaceinmobiliario.cl/cache/4f3e7242b37b27_fachada.jpg.png" },
    { id: uuids[116], id_user: users[26], name: 'Proyecto de Prueba - Etapa 03', address: "Piedra Roja, Chicureo, RM", image: "http://www.piedraroja.cl/slides/edificios-hacienda.jpg" },
    { id: uuids[117], id_user: users[26], name: 'Proyecto de Prueba - Etapa 04', address: "Santa María de Manquehue, Vitacura, Santiago", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014121638293369179.jpg" },
    { id: uuids[118], id_user: users[26], name: 'Proyecto de Prueba - Etapa 05', address: "Santa María de Manquehue, Vitacura, Santiago", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014121638293369179.jpg" },
    { id: uuids[119], id_user: users[26], name: 'Proyecto de Prueba - Etapa 06', address: "Colina, Chacabuco, RM", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2011101718359062500.JPG" },
    { id: uuids[120], id_user: users[26], name: 'Proyecto de Prueba - Etapa 07', address: "Machalí, IX Región", image: "http://gestion.enlaceinmobiliario.cl/cache/538655d7519529_CEDRO.jpg.png" },
    { id: uuids[121], id_user: users[26], name: 'Proyecto de Prueba - Etapa 08', address: "Piedra Roja, Chicureo, RM", image: "http://www.dconstruccion.cl/wp-content/uploads/montepiedra.jpg" },
    { id: uuids[122], id_user: users[26], name: 'Proyecto de Prueba - Etapa 09', address: "Santa María de Manquehue, Vitacura, Santiago", image: "http://www.elinmobiliario.cl/Upload/Proyecto/Images/m2014121638293369179.jpg" },
    { id: uuids[123], id_user: users[26], name: 'Proyecto de Prueba - Etapa 10', address: "Piedra Roja, Chicureo, RM", image: "http://www.propiedades.emol.com/images/noticias/Los%20maderos%20%20small.jpg" },
    { id: uuids[124], id_user: users[26], name: 'Proyecto de Prueba - Etapa 11', address: "Piedra Roja, Chicureo, RM", image: "api/public/images/no-image.png" },
    { id: uuids[125], id_user: users[26], name: 'Proyecto de Prueba - Etapa 12', address: "Piedra Roja, Chicureo, RM", image: "http://static.toctoc.com/fotos/20140724/262372/n_wm_2014072402042805684.jpg" },
    { id: uuids[126], id_user: users[26], name: 'Proyecto de Prueba - Etapa 13', address: "Piedra Roja, Chicureo, RM", image: "http://www.dconstruccion.cl/wp-content/uploads/montepiedra.jpg" },
    { id: uuids[127], id_user: users[26], name: 'Proyecto de Prueba - Etapa 14', address: "Machalí, IX Región", image: "http://gestion.enlaceinmobiliario.cl/cache/4f3e7242b37b27_fachada.jpg.png" },
    { id: uuids[128], id_user: users[26], name: 'Proyecto de Prueba - Etapa 15', address: "Piedra Roja, Chicureo, RM", image: "http://www.propiedades.emol.com/images/noticias/Los%20maderos%20%20small.jpg" },
    { id: uuids[129], id_user: users[26], name: 'Proyecto de Prueba - Etapa 16', address: "Agustin del Castillo Nº2860, Vitacura, RM", image: "api/public/images/no-image.png" }
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
