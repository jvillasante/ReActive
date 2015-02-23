'use strict';

var React = require('react');
var Select = require('react-select');
var ReactBootstrap = require('react-bootstrap');
var OverlayMixin = ReactBootstrap.OverlayMixin;
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var DashboardStore = require('../../stores/DashboardStore');

var GrapicModal = React.createClass({
  onProjectSelected(val) {
    console.log(val);
    this.renderChart();
  },

  renderChart: function() {
    var node = this.refs.chartNode.getDOMNode();
    // var chart = new Highcharts().Chart({
      // chart: {
        // renderTo: node
      // },
      // title: {
        // text: 'Monthly Average Temperature',
        // x: -20 //center
      // },
      // subtitle: {
        // text: 'Source: WorldClimate.com',
        // x: -20
      // },
      // xAxis: {
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          // 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      // },
      // yAxis: {
        // title: {
          // text: 'Temperature (°C)'
        // },
        // plotLines: [{
          // value: 0,
          // width: 1,
          // color: '#808080'
        // }]
      // },
      // tooltip: {
        // valueSuffix: '°C'
      // },
      // legend: {
        // layout: 'vertical',
        // align: 'right',
        // verticalAlign: 'middle',
        // borderWidth: 0
      // },
      // series: [{
        // name: 'Tokyo',
        // data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      // }, {
        // name: 'New York',
        // data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      // }, {
        // name: 'Berlin',
        // data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      // }, {
        // name: 'London',
        // data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      // }]
    // });
  },

  render: function() {
    return (
      <Modal title="Gr&aacute;ficos" onRequestHide={this.props.onToggle}>
        <div className="modal-body">
          <div className="container">
            <div className="row modal-select-project">
              <Select
                name="modal-select-project"
                placeholder="Seleccione Proyecto"
                value={this.props.options[0]}
                options={this.props.options.map(function(value) { return { value: value, label: value }; })}
                onChange={this.onProjectSelected}
              />
            </div>
            <div className="row">
              <div className="chart" ref="chartNode">Hello</div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button onClick={this.props.onToggle}>Cerrar</Button>
        </div>
      </Modal>
    );
  }
});

var Graphics = React.createClass({
  mixins: [OverlayMixin],

  getInitialState: function() {
    return {
      isModalOpen: false,
      options: []
    };
  },

  handleToggle: function(evt) {
    if (evt) { evt.preventDefault(); }

    this.setState({
      isModalOpen: !this.state.isModalOpen,
      options: (DashboardStore.getSelectValues()) ? DashboardStore.getSelectValues().split('|') : []
    });
  },

  renderOverlay: function() {
    if (!this.state.isModalOpen) { return <span/>; }

    return (
      <GrapicModal options={this.state.options} onToggle={this.handleToggle} />
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
