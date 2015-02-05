'use strict';

require('./Dashboard.less');
var React = require('react');
var SimpleTable = require('react-simple-table');

var GeneralTable = React.createClass({
  render: function() {
    return (
      <div className="container global-report-box">
        <div className="card-charts main-card">
          <div className="main-card-header clearfix">
            <div className="main-card-title">
              AUTOEVALUACION  ESTANDAR LEAN 2014
            </div>
            <div className="main-card-icon-nav">
              <div className="main-card-icon-button">
                vs
              </div>
              <div className="main-card-icon-button">
                <span className="glyphicon glyphicon-search"></span>
              </div>
              <div className="main-card-icon-button">
                <span className="glyphicon glyphicon-print"></span>
              </div>
              <div className="main-card-icon-button">
                <span className="glyphicon glyphicon-download"></span>
              </div>
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
                  {this.props.projects.map(function(row) {
                    return (
                      <tr>
                        return <td>{row.label}</td>;
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3">
            <h3 className="sub-header">Sistema Last Planner</h3>
            <div className="table-responsive">
            <table className="table table-condensed table-header-rotated">
              <thead>
                <tr>
                  <th className="rotate-45"><div><span>Participacion Reunion</span></div></th>
                  <th className="rotate-45"><div><span>Registros e Indicadores</span></div></th>
                  <th className="rotate-45"><div><span>Planificacion Semana Anterior</span></div></th>
                  <th className="rotate-45"><div><span>Plan Intermedio</span></div></th>
                  <th className="rotate-45"><div><span>Planificacion Semanal</span></div></th>
                </tr>
              </thead>
              <tbody>
                {this.props.table1.map(function(row) {
                  return (
                    <tr>
                      {row.map(function(cell) {
                        return <td className={'cell-' + cell}>{cell}</td>;
                      })};
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
          <div className="col-md-3">
            <h3 className="sub-header">Metodo 6S Bodega</h3>
            <div className="table-responsive">
            <table className="table table-condensed table-header-rotated">
              <thead>
                <tr>
                  <th className="rotate-45"><div><span>S1 Separar-Poner En</span></div></th>
                  <th className="rotate-45"><div><span>S2 Situar</span></div></th>
                  <th className="rotate-45"><div><span>S3 Suprimir</span></div></th>
                  <th className="rotate-45"><div><span>S4 Sennalizar</span></div></th>
                  <th className="rotate-45"><div><span>S6 Seguridad</span></div></th>
                </tr>
              </thead>
              <tbody>
                {this.props.table2.map(function(row) {
                  return (
                    <tr>
                      {row.map(function(cell) {
                        return <td className={'cell-' + cell}>{cell}</td>;
                      })};
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
          <div className="col-md-3">
            <h3 className="sub-header">Practicas Lean</h3>
            <div className="table-responsive">
            <table className="table table-condensed table-header-rotated">
              <thead>
                <tr>
                  <th className="rotate-45"><div><span>Checklist Sennaletica</span></div></th>
                  <th className="rotate-45"><div><span>Checklist Seguridad y Protecciones</span></div></th>
                  <th className="rotate-45"><div><span>Checklist Vias de Acceso</span></div></th>
                  <th className="rotate-45"><div><span>Cehcklist Logistica</span></div></th>
                  <th className="rotate-45"><div><span>Checklist Tierra, Escombros y Basura</span></div></th>
                  <th className="rotate-45"><div><span>Sello Manquehue</span></div></th>
                </tr>
              </thead>
              <tbody>
                {this.props.table3.map(function(row) {
                  return (
                    <tr>
                      {row.map(function(cell) {
                        return <td className={'cell-' + cell}>{cell}</td>;
                      })};
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

module.exports = GeneralTable;
