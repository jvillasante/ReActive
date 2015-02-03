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

    PROJECT_INPUT_ADD: null,
    PROJECT_INPUT_REMOVE: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
