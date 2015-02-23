'use strict';

var React = require('react');
var Select = require('react-select');
var ReactBootstrap = require('react-bootstrap');
var OverlayMixin = ReactBootstrap.OverlayMixin;
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var moment = require('moment');
var DashboardStore = require('../../stores/DashboardStore');

var graphics = ['Sistema Last Planner', 'Método 6S Bodega', 'Prácticas Lean'];

var GrapicModal = React.createClass({
  onProjectSelected(val) {
    console.log(val);
    this.renderChart(this.props.number);
  },

  renderChart: function(number) {
    var node = this.refs.chartNode.getDOMNode();
    var chart = new Highcharts.Chart({
      chart: {
        renderTo: node,
        type: 'spline'
      },
      title: {
        //text: graphics[this.props.number - 1]
        text: null
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Fecha'
        }
      },
      yAxis: {
        title: {
          text: 'Porciento (%)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },

      series: [{
        name: 'Winter 2007-2008',
        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        data: [
          [Date.UTC(1970,  9, 27), 0   ],
          [Date.UTC(1970, 10, 10), 0.6 ],
          [Date.UTC(1970, 10, 18), 0.7 ],
          [Date.UTC(1970, 11,  2), 0.8 ],
          [Date.UTC(1970, 11,  9), 0.6 ],
          [Date.UTC(1970, 11, 16), 0.6 ],
          [Date.UTC(1970, 11, 28), 0.67],
          [Date.UTC(1971,  0,  1), 0.81],
          [Date.UTC(1971,  0,  8), 0.78],
          [Date.UTC(1971,  0, 12), 0.98],
          [Date.UTC(1971,  0, 27), 1.84],
          [Date.UTC(1971,  1, 10), 1.80],
          [Date.UTC(1971,  1, 18), 1.80],
          [Date.UTC(1971,  1, 24), 1.92],
          [Date.UTC(1971,  2,  4), 2.49],
          [Date.UTC(1971,  2, 11), 2.79],
          [Date.UTC(1971,  2, 15), 2.73],
          [Date.UTC(1971,  2, 25), 2.61],
          [Date.UTC(1971,  3,  2), 2.76],
          [Date.UTC(1971,  3,  6), 2.82],
          [Date.UTC(1971,  3, 13), 2.8 ],
          [Date.UTC(1971,  4,  3), 2.1 ],
          [Date.UTC(1971,  4, 26), 1.1 ],
          [Date.UTC(1971,  5,  9), 0.25],
          [Date.UTC(1971,  5, 12), 0   ]
        ]
      }, {
        name: 'Winter 2008-2009',
        data: [
          [Date.UTC(1970,  9, 18), 0   ],
          [Date.UTC(1970,  9, 26), 0.2 ],
          [Date.UTC(1970, 11,  1), 0.47],
          [Date.UTC(1970, 11, 11), 0.55],
          [Date.UTC(1970, 11, 25), 1.38],
          [Date.UTC(1971,  0,  8), 1.38],
          [Date.UTC(1971,  0, 15), 1.38],
          [Date.UTC(1971,  1,  1), 1.38],
          [Date.UTC(1971,  1,  8), 1.48],
          [Date.UTC(1971,  1, 21), 1.5 ],
          [Date.UTC(1971,  2, 12), 1.89],
          [Date.UTC(1971,  2, 25), 2.0 ],
          [Date.UTC(1971,  3,  4), 1.94],
          [Date.UTC(1971,  3,  9), 1.91],
          [Date.UTC(1971,  3, 13), 1.75],
          [Date.UTC(1971,  3, 19), 1.6 ],
          [Date.UTC(1971,  4, 25), 0.6 ],
          [Date.UTC(1971,  4, 31), 0.35],
          [Date.UTC(1971,  5,  7), 0   ]
        ]
      }, {
        name: 'Winter 2009-2010',
        data: [
          [Date.UTC(1970,  9,  9), 0   ],
          [Date.UTC(1970,  9, 14), 0.15],
          [Date.UTC(1970, 10, 28), 0.35],
          [Date.UTC(1970, 11, 12), 0.46],
          [Date.UTC(1971,  0,  1), 0.59],
          [Date.UTC(1971,  0, 24), 0.58],
          [Date.UTC(1971,  1,  1), 0.62],
          [Date.UTC(1971,  1,  7), 0.65],
          [Date.UTC(1971,  1, 23), 0.77],
          [Date.UTC(1971,  2,  8), 0.77],
          [Date.UTC(1971,  2, 14), 0.79],
          [Date.UTC(1971,  2, 24), 0.86],
          [Date.UTC(1971,  3,  4), 0.8 ],
          [Date.UTC(1971,  3, 18), 0.94],
          [Date.UTC(1971,  3, 24), 0.9 ],
          [Date.UTC(1971,  4, 16), 0.39],
          [Date.UTC(1971,  4, 21), 0   ]
        ]
      }]
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
      options: []
    };
  },

  handleToggle: function() {
    var number, evt, args = Array.prototype.slice.call(arguments, 0);
    if (args.length === 3) {
      number = args[0];
      evt = args[1];
    } else {
      evt = args[0];
    }

    evt.preventDefault();
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      options: (DashboardStore.getSelectValues()) ? DashboardStore.getSelectValues().split('|') : [],
      number: number
    });
  },

  renderOverlay: function() {
    if (!this.state.isModalOpen) { return <span/>; }

    return (
      <GrapicModal options={this.state.options} number={this.state.number} onToggle={this.handleToggle} />
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
              <a href="#" onClick={this.handleToggle.bind(this, 1)}><img className="img-responsive img-rounded" src="images/s05.jpg" alt="" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Graphics;
