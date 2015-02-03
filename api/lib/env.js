'use strict';

exports.configure = function(env) {
  if (!env) { env = process.env.NODE_ENV; }

  // default to development
  env = env || 'development';

  return function(env2, callback) {
    if (env === env2) { callback(); }
  };
};
