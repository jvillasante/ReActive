'use strict';

/**
 * SessionStore
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var SESSION_STORAGE_KEY = 'user-session';

var CHANGE_EVENT = 'session_store_change';

var error = null;
var session = null;

function createSession(user) {
  error = null;
  session = {
    isLoggedIn: true,
    user: user
  };
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

function destroySession() {
  error = null;
  session = null;
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

function setError(err) {
  error = err;
  session = null;
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
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
    if (!session) {
      session = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
    }
    return session;
  },

  getError: function() {
    return error;
  },

  getUser: function() {
    if (!session) {
      session = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
    }
    return (session && session.user) ? session.user : null;
  },

  getToken: function() {
    if (!session) {
      session = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
    }
    return (session && session.user && session.user.token) ? session.user.token : null;
  },

  isLoggedIn: function() {
    if (!session) {
      session = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
    }
    return (session && session.isLoggedIn) ? session.isLoggedIn : null;
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
