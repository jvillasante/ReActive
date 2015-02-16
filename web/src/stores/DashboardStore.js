'use strict';

/**
 * DashboardStore
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var CHANGE_EVENT = 'dashboard_store_change';
var projects = [];

function addProjects(data) {
  projects = data.projects;
}

function removeProjects(projects) {

}

var DashboardStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getProjects: function() {
    return projects;
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.DASHBOARD_DATA_LOAD:
      addProjects(action.data);
      DashboardStore.emitChange();
      break;
    case ActionTypes.DASHBOARD_DATA_LOAD_ERROR:
      console.log("error: %s", action.error);
      DashboardStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = DashboardStore;
