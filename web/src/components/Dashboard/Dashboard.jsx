'use strict';

require('./Dashboard.less');
var React = require('react');
var Authentication = require('../../mixins/Authentication');
var ProjectInput = require('./ProjectInput');
var DashboardStore = require('../../stores/DashboardStore');
var ReactBootstrap = require('react-bootstrap');
var Alert = ReactBootstrap.Alert;

var Dashboard = React.createClass({
  mixins: [Authentication],

  getInitialState: function() {
    return {
      error: null
    };
  },

  componentDidMount: function() {
    DashboardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashboardStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    if (DashboardStore.getError()) {
      return this.setState({ error: DashboardStore.getError() });
    }
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
        <ProjectInput />
      </div>
    );
  },
});

module.exports = Dashboard;
