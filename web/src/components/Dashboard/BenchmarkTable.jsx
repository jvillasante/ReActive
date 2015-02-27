'use strict';

var React = require('react');

var BenchmarkTable = React.createClass({
  render: function() {
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
                    return <tr><td>{row}</td></tr>;
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
