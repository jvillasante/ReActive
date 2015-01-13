'use strict';

const
  http = require('http'),
  express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  env = require('./lib/env'),
  routes = require('./routes'),
  UserProvider = require('./data/userProvider').UserProvider;

const 
  app = express(),
  router = express.Router(),
  configure = env.configure(),
  config = require('./config.json')[app.get('env')],
  userProvider = new UserProvider(config.connectionStr);

configure('development', function() {
  app.use(logger('dev'));
  http.globalAgent.maxSockets = 500;
});

configure('production', function() {
  // app.use(logger('combined'));
  http.globalAgent.maxSockets = 1000;
});

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
  req.connectionStr = config.connectionStr;
  req.userProvider = userProvider;
  next();
});

// User Routes
router.route('/users')
  .get(routes.auth.isAuthenticated, routes.users.all)
  .post(routes.users.create);
router.route('/users/:id')
  .get(routes.auth.isAuthenticated, routes.users.show)
  .patch(routes.auth.isAuthenticated, routes.users.update)
  .delete(routes.auth.isAuthenticated, routes.users.remove);

// Project Routes
router.route('/projects')
  .get(routes.auth.isAuthenticated, routes.projects.all);
router.route('/projects/:projectId/templates')
  .get(routes.auth.isAuthenticated, routes.templates.allByProject);
router.route('/projects/:projectId/templates/:templateId')
  .get(routes.auth.isAuthenticated, routes.templates.show);

// Mount and errors
app.use('/api/v1/', router);
app.use(routes.errors.notFound);
app.use(routes.errors.handleErrors);

module.exports = app;
if (!module.parent) {
  http.createServer(app)
    .on('error', function(err) {
      if (err.code === 'EADDRINUSE') {
        console.log('Failed to bind to port - address already in use');
        process.exit(1);
      } 
    })
    .listen(config.port, config.host, 1024, function() {
      console.log('(pid: %s) (env: %s) listening on [%s:%s]', process.pid, app.get('env') || 'development', config.host, config.port);
    });
}

