'use strict';

var React = require('react');
var Select = require('react-select');
var ReactBootstrap = require('react-bootstrap');
var OverlayMixin = ReactBootstrap.OverlayMixin;
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var moment = require('moment');
var DashboardStore = require('../../stores/DashboardStore');
var Api = require('../../utils/Api');

var graphics = ['Sistema Last Planner', 'Método 6S Bodega', 'Prácticas Lean', 'Benchmark'];

var GrapicModal = React.createClass({
  onProjectSelected(val) {
    var self = this;
    Api.getProjectsDataForGraphic(
      self.props.number,
      DashboardStore.getStartDate().format('x'),
      DashboardStore.getEndDate().format('x'),
      val, function(data) {
        console.log(data);
        self.renderChart(self.props.number, val, data);
      }, function(error) {
        console.log(error);
      });
  },

  renderChart: function(number, project, data) {
    var node = this.refs.chartNode.getDOMNode();
    var chart = new Highcharts.Chart({
      chart: {
        renderTo: node,
        type: 'spline'
      },
      title: {
        text: null
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Línea de Tiempo'
        }
      },
      yAxis: {
        title: {
          text: null
        }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },
      series: data.data
    });
  },

  render: function() {
    var startDate = DashboardStore.getStartDate().format('DD/MM/YYYY');
    var endDate = DashboardStore.getEndDate().format('DD/MM/YYYY');
    var header = graphics[this.props.number - 1] + ' (' + startDate + ' - ' + endDate + ')';

    return (
      <Modal className="graphics-modal" title={header} onRequestHide={this.props.onToggle}>
        <div className="modal-body">
          <div className="container">
            <div className="row modal-select-project">
              <Select
                name="modal-select-project"
                placeholder="Seleccione Proyecto"
                options={this.props.options.map(function(value) { return { value: value, label: value }; })}
                onChange={this.onProjectSelected}
              />
            </div>
            <div className="row">
              <div className="chart" ref="chartNode">Seleccione un proyecto para ver el gr&aacute;fico.</div>
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
      options: [],
    };
  },

  handleToggle: function(graphicNumber) {
    if (graphicNumber) {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
        options: (DashboardStore.getSelectValues()) ? DashboardStore.getSelectValues().split('|') : [],
        number: graphicNumber
      });
    } else {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
        options: [],
        number: null
      });
    }
  },

  onTable1GraphicClick: function(evt) {
    evt.preventDefault();
    this.handleToggle(1);
  },

  onTable2GraphicClick: function(evt) {
    evt.preventDefault();
    this.handleToggle(2);
  },

  onTable3GraphicClick: function(evt) {
    evt.preventDefault();
    this.handleToggle(3);
  },

  onBenchmarkGraphicClick: function(evt) {
    evt.preventDefault();
    this.handleToggle(4);
  },

  renderOverlay: function() {
    if (!this.state.isModalOpen) { return <span/>; }

    return (
      <GrapicModal options={this.state.options} number={this.state.number} onToggle={this.handleToggle} />
    );
  },

  render: function() {
    if (this.props.kind === 'autoevaluacion') {
      return (
        <div className="dashboard-graphics">
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
                <a href="#" onClick={this.onTable1GraphicClick}><img className="img-responsive img-rounded" src="images/s05.jpg" alt="" /></a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-charts small-card">
                <div className="main-card-header">
                  <div className="icon-card-header">
                    <span className="glyphicon glyphicon-th"></span>
                  </div>
                  <div className="card-title">
                    M&eacute;todo 6S Bodega
                  </div>
                </div>
                <a href="#" onClick={this.onTable2GraphicClick}><img className="img-responsive img-rounded" src="images/s05.jpg" alt="" /></a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-charts small-card">
                <div className="main-card-header">
                  <div className="icon-card-header">
                    <span className="glyphicon glyphicon-th"></span>
                  </div>
                  <div className="card-title">
                    Pr&aacute;cticas Lean
                  </div>
                </div>
                <a href="#" onClick={this.onTable3GraphicClick}><img className="img-responsive img-rounded" src="images/s05.jpg" alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.kind === 'benchmark') {
      return (
        <div className="dashboard-graphics">
          <div className="row">
            <div className="col-md-4">
              <div className="card-charts small-card">
                <div className="main-card-header">
                  <div className="icon-card-header">
                    <span className="glyphicon glyphicon-th"></span>
                  </div>
                  <div className="card-title">
                    Benchmark
                  </div>
                </div>
                <a href="#" onClick={this.onBenchmarkGraphicClick}><img className="img-responsive img-rounded" src="images/s05.jpg" alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <span />
      );
    }
  },
});

module.exports = Graphics;
