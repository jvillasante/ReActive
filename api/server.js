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
  app.use(logger('combined'));
  http.globalAgent.maxSockets = 1000;
});

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  req.connectionStr = config.connectionStr;
  req.userProvider = userProvider;
  next();
});

// Login route
router.route('/login')
  .post(routes.auth.login);

// User Routes
router.route('/users')
  .get(routes.auth.isAuthenticated, routes.auth.isAdmin, routes.users.all)
  .post(routes.auth.isAuthenticated, routes.auth.isAdmin, routes.users.create);
router.route('/users/:id')
  .get(routes.auth.isAuthenticated, routes.users.show)
  .patch(routes.auth.isAuthenticated, routes.users.update)
  .delete(routes.auth.isAuthenticated, routes.auth.isAdmin, routes.users.remove);

// Project routes
router.route('/projects')
  .get(routes.auth.isAuthenticated, routes.projects.allByUser)
  .post(routes.auth.isAuthenticated, routes.auth.isAdmin, routes.projects.create);
router.route('/projects/:id')
  .get(routes.auth.isAuthenticated, routes.projects.show)
  .patch(routes.auth.isAuthenticated, routes.auth.isAdmin, routes.projects.update)
  .delete(routes.auth.isAuthenticated, routes.auth.isAdmin, routes.projects.remove);

// Dashboard routes
router.route('/dashboard/projects')
  .get(routes.auth.isAuthenticated, routes.auth.isAdmin, routes.dashboard.allProjects);
router.route('/dashboard/projects/data')
  .get(routes.auth.isAuthenticated, routes.auth.isAdmin, routes.dashboard.getProjectData);

// Template routes
router.route('/projects/:projectId/templates')
  .get(routes.auth.isAuthenticated, routes.templates.allByProject);          // all templates by user and project
router.route('/projects/:projectId/templates/:templateId')
  .get(routes.auth.isAuthenticated, routes.templates.getById);               // get template by user and project and id
router.route('/projects/:projectId/templates/:parentId/templates')
  .get(routes.auth.isAuthenticated, routes.templates.allByProjectAndParent); // all templates by user and project and parent

// Report routes
router.route('/projects/:projectId/templates/:templateId/reports')
  .get(routes.auth.isAuthenticated, routes.reports.allByProjectAndTemplate)  // all reports by user and project and template
  .post(routes.auth.isAuthenticated, routes.reports.create);                 // create report by user and project and template

router.route('/projects/:projectId/reports')
  .get(routes.auth.isAuthenticated, routes.reports.allByProject);   // all reports by user and project

router.route('/reports')
  .get(routes.auth.isAuthenticated, routes.reports.allByUser);      // all reports by user

router.route('/reports/:id')
  .get(routes.auth.isAuthenticated, routes.reports.show)            // show report by user and id
  .put(routes.auth.isAuthenticated, routes.reports.update)          // update report (only report data, not field values)
  .delete(routes.auth.isAuthenticated, routes.reports.remove);      // delete report and all field values associated with it

router.route('/reports/:id/fields')
  .post(routes.auth.isAuthenticated, routes.reports.addField);      // add field values to report

router.route('/reports/:reportId/fields/:id')
  .get(routes.auth.isAuthenticated, routes.reports.showField)       // show field values of report
  .put(routes.auth.isAuthenticated, routes.reports.updateField)     // update field values of report
  .delete(routes.auth.isAuthenticated, routes.reports.removeField); // remove field values of report

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

