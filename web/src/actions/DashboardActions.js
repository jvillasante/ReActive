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
  }
};
