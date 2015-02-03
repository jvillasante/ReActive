'use strict';

/**
 * SessionActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Api = require('../utils/Api');
var ActionTypes = AppConstants.ActionTypes;

module.exports = {
  create: function(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SESSION_CREATE,
      data: data
    });

    Api.createSession(data, function(user) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.SESSION_CREATE_OK,
        user: user
      });
    }, function(error) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.SESSION_CREATE_ERROR,
        error: error
      });
    });
  },

  destroy: function(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SESSION_DESTROY,
      data: data
    });
  }
};
