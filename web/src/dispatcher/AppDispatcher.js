/*
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */
'use strict';

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var PayloadSources = require('../constants/AppConstants').PayloadSources;

var AppDispatcher = assign(new Dispatcher(), {
  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
