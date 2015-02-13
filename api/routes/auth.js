'use strict';

const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  BearerStrategy = require('passport-http-bearer').Strategy,
  errTo = require('errto'),
  Err = require('custom-err'),
  jwt = require('../lib/jwt.js'),
  bcrypt = require('../lib/bcrypt');

passport.use(new BearerStrategy({passReqToCallback: true}, function(req, token, callback) {
  jwt.verify(token, errTo(callback, function(user) {
    if (!user) { return callback(null, false); }
    return callback(null, user, { scope: 'all' });
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

      callback(null, {
        username: user.username,
        email: user.email,
        role: user.role,
        token: jwt.sign(user)
      });
    }));
  }));
}));

exports.login = function(req, res, next) {
  passport.authenticate('local', {session: false}, function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(Err("Unauthorized", { code: 401, description: "You need to log in first at POST /api/v1/login", errors: []}));
    } else {
      res.status(200).send(user);
    }
  })(req, res, next);
};

exports.isAuthenticated = passport.authenticate('bearer', { session: false });

exports.isAdmin = function(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(Err("Forbidden", { code: 403, description: "You don't have permissions to carry this action.", errors: []}));
  }
};
