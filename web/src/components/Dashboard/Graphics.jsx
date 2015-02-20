'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var OverlayMixin = ReactBootstrap.OverlayMixin;
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var Graphics = React.createClass({
  mixins: [OverlayMixin],

  getInitialState: function() {
    return {
      isModalOpen: false
    };
  },

  handleToggle: function(evt) {
    evt.preventDefault();

    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  renderOverlay: function() {
    if (!this.state.isModalOpen) { return <span/>; }

    return (
      <Modal title="Modal heading" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          This modal is controlled by our custom trigger component.
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  },

  render: function() {
    return (
      <div className="container dashboard-graphics">
        <div className="row">
          <div className="col-md-4">
            <div className="card-charts small-card">
              <div className="main-card-header">
                <div className="icon-card-header">
                  <span className="glyphicon glyphicon-th"></span>
                </div>
                <div className="card-title">
                  Sistema Last Planner
                </div>
              </div>
              <a href="#" onClick={this.handleToggle}><img className="img-responsive img-rounded" src="images/s05.jpg" alt="" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Graphics;
