'use strict';

require('./Application.less');
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SessionStore = require('../../stores/SessionStore');
var DashboardStore = require('../../stores/DashboardStore');
var SessionActions = require('../../actions/SessionActions');

var ReactBootstrap = require('react-bootstrap');
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var DropdownButton = ReactBootstrap.DropdownButton;

var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;
var MenuItemLink = ReactRouterBootstrap.MenuItemLink;

var Master = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getAuthButton: function() {
    if (!SessionStore.isLoggedIn()) {
      return (
        <span className="navbar-login-button">
          <a onClick={this._onLoginClick} className="btn btn-info navbar-btn">Iniciar Sesi&oacute;n</a>
        </span>
      );
    } else {
      return (
        <span className="navbar-login-button">
          <a onClick={this._onLogoutClick} className="btn btn-info navbar-btn">
            {SessionStore.getUser().username} &raquo; Cerrar Sesi&oacute;n
          </a>
        </span>
      );
    }
  },

  _onLoginClick: function(evt) {
    evt.preventDefault();
    this.transitionTo('login');
  },

  _onLogoutClick: function(evt) {
    evt.preventDefault();
    SessionActions.destroy({});
    DashboardStore.clear();

    if (this.isActive('/')) {
      this.forceUpdate();
    } else {
      this.transitionTo('/');
    }
  },

  render: function() {
    var auth = this.getAuthButton();
    var brand = (
      <span className="navbar-logo">
        <a className="navbar-brand" href="#">
          ReActive
        </a>
      </span>
    );

    return (
      <div>
        <Navbar ref="header" className="navbar navbar-default" brand={brand} fixedTop={true} fluid={true} toggleNavKey={1}>
          <Nav className="navbar-left" eventKey={1}>
            <NavItemLink to="dashboard" eventKey={2}>Dashboard</NavItemLink>
            {auth}
          </Nav>
        </Navbar>

        <RouteHandler />

        <div className="navbar-footer">
          <div className="container">
            <p className="text-muted">
              <span>© Innobis</span>
              <span><a href="#">Home</a></span>
              <span><a href="#">About</a></span>
            </p>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Master;
