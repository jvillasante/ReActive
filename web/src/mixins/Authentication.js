'use strict';

var SessionStore = require('../stores/SessionStore');
var Login = require('../components/Login/Login.jsx');

module.exports = {
  statics: {
    willTransitionTo: function(transition) {
      if (!SessionStore.isLoggedIn()) {
        Login.attemptedTransition = transition;
        transition.redirect('/login');
      }
    }
  }
};
