'use strict';

var React = require('react');
var Router = require('react-router');
var DashboardActions = require('../../actions/DashboardActions');
var DashboardStore = require('../../stores/DashboardStore');

var BenchmarkTable = React.createClass({
  mixins: [Router.Navigation],

  _onTableCellClick: function(project, evt) {
    evt.preventDefault();
    DashboardActions.loadReportData(1, -1, DashboardStore.getStartDate(), DashboardStore.getEndDate(), project);
    this.transitionTo('reports');
  },

  _getClass: function(col, value) {
    var result = "";
    col = Number(col);
    value = Number(value);

    if (col === 0) {
      if (value < 0.05) {
        result = "benchmark-item-gray";
      } else if (value >= -0.05 && value < 0) {
        result = "benchmark-item-green";
      } else if (value >= 0 && value <= 0.05) {
        result = "benchmark-item-yellow";
      } else if (value > 0.05) {
        result = "benchmark-item-red";
      }
    } else if (col === 1) {
      if (value < 0) {
        result = "benchmark-item-green";
      } else if (value >= 0 && value <= 0.2) {
        result = "benchmark-item-yellow";
      } else if (value > 0.2) {
        result = "benchmark-item-red";
      }
    } else if (col === 2) {
      if (value < 22) {
        result = "benchmark-item-green";
      } else if (value === 22) {
        result = "benchmark-item-yellow";
      } else if (value > 22) {
        result = "benchmark-item-red";
      }
    } else if (col === 3) {
      if (value < 400) {
        result = "benchmark-item-green";
      } else if (value === 400) {
        result = "benchmark-item-yellow";
      } else if (value > 400) {
        result = "benchmark-item-red";
      }
    } else if (col === 4) {
      if (value >= 0.8) {
        result = "benchmark-item-green";
      } else if (value < 0.8 && value >= 0.65) {
        result = "benchmark-item-yellow";
      } else if (value < 0.65) {
        result = "benchmark-item-red";
      }
    } else if (col === 5) {
      if (value >= 0.8) {
        result = "benchmark-item-green";
      } else if (value < 0.8 && value >= 0.7) {
        result = "benchmark-item-yellow";
      } else if (value < 0.7) {
        result = "benchmark-item-red";
      }
    } else if (col === 6) {
      result = "benchmark-item-gray";
    } else if (col === 7 || col === 8 || col == 9) {
      if (value < 1) {
        result = "benchmark-item-green";
      } else if (value >= 0 && value <= 1) {
        result = "benchmark-item-yellow";
      } else if (value > 1) {
        result = "benchmark-item-red";
      }
    } else if (col === 10) {
      if (value === 0) {
        result = "benchmark-item-green";
      } else if (value > 0 && value <= 0.5) {
        result = "benchmark-item-yellow";
      } else if (value > 0.5) {
        result = "benchmark-item-red";
      }
    } else if (col === 11) {
      if (value >= 0.8) {
        result = "benchmark-item-green";
      } else if (value < 0.8 && value >= 0.65) {
        result = "benchmark-item-yellow";
      } else if (value < 0.65) {
        result = "benchmark-item-red";
      }
    }
    return result;
  },

  render: function() {
    var self = this;
    return (
      <div className="global-report-box">
        <div className="card-charts main-card">
          <div className="main-card-header clearfix">
            <div className="main-card-title">
              BENCHMARK
            </div>
            <div className="main-card-icon-nav">
            </div>
          </div>

          <div className="col-md-3">
            <h3 className="sub-header">Proyectos</h3>
            <div className="table-responsive">
              <table className="table table-condensed projects-table table-header-rotated">
                <thead>
                  <tr>
                    <th className="rotate-45"><div><span></span></div></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.projects && this.props.projects.split('|').map(function(row) {
                    return (
                      <tr>
                        <td>
                          <a href="#" onClick={self._onTableCellClick.bind(self, row)}>
                            {row}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-9">
            <h3 className="sub-header">Consolidado de Indicadores</h3>
            <div className="table-responsive">
            <table className="table table-condensed table-header-rotated general-data-table">
              <thead>
                <tr>
                  <th className="rotate-45"><div><span>Desviaci&oacute;n de Costo</span></div></th>
                  <th className="rotate-45"><div><span>Desviaci&oacute;n de Plazo</span></div></th>
                  <th className="rotate-45"><div><span>Indice de Frecuencia</span></div></th>
                  <th className="rotate-45"><div><span>Indice de Gravedad</span></div></th>
                  <th className="rotate-45"><div><span>Efectividad de Planificaci&oacute;n</span></div></th>
                  <th className="rotate-45"><div><span>Liberaci&oacute;n de Restricciones</span></div></th>
                  <th className="rotate-45"><div><span>Calidad</span></div></th>
                  <th className="rotate-45"><div><span>Productividad FP</span></div></th>
                  <th className="rotate-45"><div><span>Productividad FC</span></div></th>
                  <th className="rotate-45"><div><span>Productividad FF</span></div></th>
                  <th className="rotate-45"><div><span>Cambio en Monto Contratado</span></div></th>
                  <th className="rotate-45"><div><span>Desempe&ntilde;o Subcontrato</span></div></th>
                </tr>
              </thead>
              <tbody>
                {this.props.benchmarkTable.map(function(row, roIndex) {
                  return (
                    <tr>
                      {row.map(function(cell, cellIndex) {
                      return (
                        <td className={self._getClass(cellIndex, cell)}>
                          {cell}
                        </td>
                      );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = BenchmarkTable;
