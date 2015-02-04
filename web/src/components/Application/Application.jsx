'use strict';

require('./Application.less');
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SessionStore = require('../../stores/SessionStore');
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

    if (this.isActive('/')) {
      this.forceUpdate();
    } else {
      this.transitionTo('/');
    }
  },

  _onHomeClick: function(evt) {
    evt.preventDefault();
    this.transitionTo('/');
  },

  render: function() {
    var auth = this.getAuthButton();
    var brand = (
      <span className="navbar-logo">
        <a className="navbar-brand" href="#">
          <img src="images/logo-small.png" width="38" height="38" alt="ReActive" />
          ReActive
        </a>
      </span>
    );

    return (
      <div>
        <Navbar ref="header" className="navbar navbar-default" brand={brand} fixedTop={true} fluid={true} toggleNavKey={1}>
          <Nav className="navbar-left" eventKey={1}>
            <NavItemLink to="dashboard" eventKey={2}>Dashboard</NavItemLink>
            <DropdownButton eventKey={3} title="Administraci&oacute;n">
              <MenuItemLink to="users" eventKey={4}>Usuarios</MenuItemLink>
              <MenuItemLink to="projects" eventKey={5}>Proyectos</MenuItemLink>
            </DropdownButton>
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
