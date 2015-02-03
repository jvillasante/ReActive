'use strict';

/**
 * SessionStore
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var CHANGE_EVENT = 'session_store_change';
var session = {
  error: null,
  isLoggedIn: false,
  user: {
    username: null,
    email: null,
    role: null,
    token: null,
  }
};

function createSession(user) {
  session.error = null;
  session.isLoggedIn = true;
  session.user = user;
}

function destroySession() {
  session.error = null;
  session.isLoggedIn = false;
  session.user.username = null;
  session.user.email = null;
  session.user.role = null;
  session.user.token = null;
}

function setError(error) {
  session.error = error;
  session.isLoggedIn = false;
  session.user = {
    username: null,
    email: null,
    role: null,
    token: null,
  };
}

var SessionStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSession: function() {
    return session;
  },

  getError: function() {
    return session.error;
  },

  getUser: function() {
    return session.user;
  },

  getToken: function() {
    return session.user.token;
  },

  isLoggedIn: function() {
    return session.isLoggedIn;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.SESSION_CREATE_OK:
      createSession(action.user);
      SessionStore.emitChange();
      break;
    case ActionTypes.SESSION_CREATE_ERROR:
      setError(action.error);
      SessionStore.emitChange();
      break;
    case ActionTypes.SESSION_DESTROY:
      destroySession();
      SessionStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = SessionStore;
