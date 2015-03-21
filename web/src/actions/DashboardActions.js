'use strict';

/**
 * DashboardActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Api = require('../utils/Api');
var ActionTypes = AppConstants.ActionTypes;
var moment = require('moment');

let templateNames = ["Benchmark", "Sistema Last Planner", "Método 6S Bodega", "Prácticas Lean"];
let columnNames = [
  "Participación Reunión",
  "Registros e Indicadores",
  "Planificación Semana Anterior",
  "Plan Intermedio",
  "Planificación Semanal",

  "S1 - Separar Lo Innecesario",
  "S2 - Situar Lo Necesario",
  "S3 - Suprimir Suciedad",
  "S4 - Señalizar Anomalías",
  "S5 - Seguir Mejorando",
  "S6 - Seguridad",

  "Checklist Señalética",
  "Checklist Seguridad y Protecciones",
  "Checklist Vías de Acceso",
  "Cehcklist Logística",
  "Checklist Tierra, Escombros y Basura",
  "Sello Manquehue"
];

module.exports = {
  loadData: function(start, end, projects) {
    Api.getProjectsData(start.format('x'), end.format('x'), projects, function(data) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.DASHBOARD_DATA_LOAD,
        data: {
          start: start,
          end: end,
          data: data
        }
      });
    }, function(error) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.DASHBOARD_DATA_LOAD_ERROR,
        error: error
      });
    });
  },

  loadReportData: function(templateId, col, start, end, project) {
    Api.getProjectsReports(templateId, col, start.format('x'), end.format('x'), project, function(data) {
      let doc;
      if (templateId === 1) {
        doc = templateNames[0];
      } else if (templateId === 2) {
        doc = templateNames[1];
      } else if (templateId === 3) {
        doc = templateNames[2];
      } else {
        doc = templateNames[3];
      }

      AppDispatcher.handleServerAction({
        type: ActionTypes.DASHBOARD_REPORTS_DATA_LOAD,
        data: {
          project: project,
          doc: doc,
          section: (col === -1) ? "Indicadores" : columnNames[col],
          data: data
        }
      });
    }, function(error) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.DASHBOARD_REPORTS_DATA_LOAD_ERROR,
        error: error
      });
    });
  },
};
