'use strict';

/**
 * DashboardActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Api = require('../utils/Api');
var ActionTypes = AppConstants.ActionTypes;

module.exports = {
  loadData: function(start, end, projects) {
    Api.getProjectsData(start, end, projects, function(data) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.DASHBOARD_DATA_LOAD,
        data: data
      });
    }, function(error) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.DASHBOARD_DATA_LOAD_ERROR,
        error: error
      });
    });
  }
};
