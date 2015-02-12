'use strict';

const _ = require('lodash');

exports.count = function(query) {
  return "SELECT COUNT(*) AS total FROM(" + query + ") AS REAL_QUERY";
};

exports.meta = function(req, others) {
  let result = {
    offset: Number(req.query.offset || 0),
    limit: Number(req.query.limit || 20)
  };

  if (others) {
    _.assign(result, others);
  }

  return result;
};

exports.pagination = function(req, offset, limit, total) {
  let links = [];

  links.push({ self: req.baseUrl + req.path + "?offset=" + offset + "&limit=" + limit });
  links.push({first: req.baseUrl + req.path + "?offset=0&limit=" + limit});
  if ((offset - limit) >= 0) {
    links.push({previous: req.baseUrl + req.path + "?offset=" + (offset - limit) + "&limit=" + limit});
  } else {
    links.push({previous: null});
  }
  if ((offset + limit) < total) {
    links.push({next: req.baseUrl + req.path + "?offset=" + (offset + limit) + "&limit=" + limit});
  } else {
    links.push({next: null});
  }
  if (total - limit >= 0) {
    links.push({last: req.baseUrl + req.path + "?offset=" + (total - limit) + "&limit=" + limit});
  } else {
    links.push({last: req.baseUrl + req.path + "?offset=0&limit=" + limit});
  }

  return {
    offset: offset,
    limit: limit,
    total: total,
    links: links
  };
};

