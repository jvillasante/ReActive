'use strict';

const 
  Err = require('custom-err'),
  STATUS_CODES = require('http').STATUS_CODES;

exports.notFound = function(req, res, next) {
  return next(Err("not found", { code: 404, description: "The resource you are trying to reach is not found on this server.", errors: []}));
};

// errors: Err('msg', { code, desc })
exports.handleErrors = function(err, req, res, next) {
  if (err.code && STATUS_CODES[err.code]) {
    res.status(err.code).send({ code: err.code, message: err.message, description: err.description, errors: err.errors});
  } else {
    res.status(500).send({ code: err.code, message: err.message, description: err.description, errors: err.errors });
  }
};

