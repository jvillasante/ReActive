'use strict';

const
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy,
  LocalStrategy = require('passport-local').Strategy,
  BearerStrategy = require('passport-http-bearer').Strategy,
  errTo = require('errto'),
  Err = require('custom-err'),
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

passport.use(new BearerStrategy({passReqToCallback: true}, function(req, token, callback) {
  req.userProvider.findByToken(token, errTo(callback, function(user) {
    // No user found with that token
    if (!user) { return callback(null, false); }

    return callback(null, user);
  }));
}));

passport.use(new LocalStrategy({passReqToCallback: true}, function(req, username, password, callback) {
  req.userProvider.findByUsername(username, errTo(callback, function(user) {
    // No user found with that username
    if (!user) { return callback(null, false); }

    // Make sure the password is correct
    bcrypt.compare(password, user.password, errTo(callback, function(isMatch) {
      // Password did not match
      if (!isMatch) { return callback(null, false); }

      // Success
      req.userProvider.setToken(user, errTo(callback, function(token) {
        return callback(null, {
          username: user.username,
          email: user.email,
          role: user.role,
          token: token
        });
      }));
    }));
  }));
}));

exports.login = function(req, res, next) {
  passport.authenticate('local', {session: false}, function(err, token) {
    if (err) {
      return next(err);
    } else if (!token) {
      return next(Err("Unauthorized", { code: 401, description: "You need to log in first at POST /api/v1/login", errors: []}));
    } else {
      res.status(200).send(token);
    }
  })(req, res, next);
};

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });

exports.isAdmin = function(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(Err("Forbidden", { code: 403, description: "You don't have permissions to carry this action.", errors: []}));
  }
};
