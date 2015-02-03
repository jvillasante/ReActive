'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

// Here we define all our material-ui ReactComponents.
var Application = require('./components/Application/Application.jsx');
var Home = require('./components/Home/Home.jsx');
var Login = require('./components/Login/Login.jsx');
var User = require('./components/User/User.jsx');
var Project = require('./components/Project/Project.jsx');
var Dashboard = require('./components/Dashboard/Dashboard.jsx');

var AppRoutes = (
  <Route name="root" path="/" handler={Application}>
    <DefaultRoute handler={Home}/>

    <Route name="home" path="home" handler={Home} />
    <Route name="login" path="login" handler={Login} />
    <Route name="dashboard" path="dashboard" handler={Dashboard} />
    <Route name="users" path="admin/users" handler={User} />
    <Route name="projects" path="admin/projects" handler={Project} />
  </Route>
);

module.exports = AppRoutes;
