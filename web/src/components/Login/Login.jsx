'use strict';

require('./Login.less');
var React = require('react');
var Router = require('react-router');
var SessionActions = require('../../actions/SessionActions');
var SessionStore = require('../../stores/SessionStore');
var ReactBootstrap = require('react-bootstrap');
var Alert = ReactBootstrap.Alert;

var Login = React.createClass({
  mixins: [Router.Navigation],

  statics: {
    attemptedTransition: null,
  },

  getInitialState: function() {
    return {
      error: null
    };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    if (SessionStore.getError()) {
      this.refs.username.getDOMNode().value = '';
      this.refs.password.getDOMNode().value = '';
      return this.setState({ error: SessionStore.getError() });
    }

    if (SessionStore.isLoggedIn()) {
      if (Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        this.transitionTo('dashboard');
      }
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    SessionActions.create({
      username: username,
      password: password
    });
  },

  handleAlertDismiss: function() {
    this.setState({ error: null });
  },

  render: function() {
    var alert = null;
    if (this.state.error) {
      alert = (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss} dismissAfter={10000}>
          <h4>Oh snap!!!</h4>
          <p>{this.state.error}</p>
        </Alert>
      );
    }

    return (
      <div>
        {alert}
        <div className="login container">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
              <div className="panel panel-default">
                <div className="panel-body">
                  <form role="form" onSubmit={this.handleSubmit}>
                    <fieldset>
                      <div className="row">
                        <div className="center-block">
                          <img className="profile-img" src="images/photo.png" alt="" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                          <div className="form-group">
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="glyphicon glyphicon-user"></i>
                              </span>
                              <input className="form-control" placeholder="Nombre de usuario" ref="username" name="loginname" type="text" autofocus />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="glyphicon glyphicon-lock"></i>
                              </span>
                              <input className="form-control" placeholder="Contraseña" ref="password" name="password" type="password" />
                            </div>
                          </div>
                          <div className="form-group">
                            <input type="submit" className="btn btn-lg btn-primary btn-block" value="Iniciar Sesi&oacute;n" />
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
