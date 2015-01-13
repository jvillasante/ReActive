'use strict';

const 
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy,
  errTo = require('errto'),
  bcrypt = require('../lib/bcrypt');

passport.use(new BasicStrategy({passReqToCallback: true}, function(req, username, password, callback) {
  req.userProvider.findByUsername(username, errTo(callback, function(user) {
    // No user found with that username
    if (!user) { return callback(null, false); }

    // Make sure the password is correct
    bcrypt.compare(password, user.password, errTo(callback, function(isMatch) {
      // Password did not match
      if (!isMatch) { return callback(null, false); }

      // Success
      return callback(null, user);
    }));
  }));
}));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
