'use strict';
/**
 * AppConstants
 */

var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    SESSION_CREATE: null,
    SESSION_CREATE_OK: null,
    SESSION_CREATE_ERROR: null,
    SESSION_DESTROY: null,

    DASHBOARD_LOAD_PROJECT: null,
    DASHBOARD_LOAD_PROJECT_OK: null,
    DASHBOARD_LOAD_PROJECT_ERROR: null,

    DASHBOARD_DATA_LOAD: null,
    DASHBOARD_DATA_LOAD_ERROR: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
