'use strict';

/**
 * DashboardActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Api = require('../utils/Api');
var ActionTypes = AppConstants.ActionTypes;
var moment = require('moment');

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
      AppDispatcher.handleServerAction({
        type: ActionTypes.DASHBOARD_REPORTS_DATA_LOAD,
        data: {
          project: project,
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
