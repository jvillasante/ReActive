'use strict';

require('./Dashboard.less');
var React = require('react');
var SimpleTable = require('react-simple-table');

var projects = [
  ['project1'],
  ['project2'],
  ['project3'],
  ['project4'],
  ['project5'],
];

var data = [
  [10, 30, 50, 80, 90],
  [10, 30, 50, 80, 90],
  [10, 30, 50, 80, 90],
  [10, 30, 50, 80, 90],
  [10, 30, 50, 80, 90],
];

function slpData(data) {
  return data.map(function(row) {
    return (
      <tr>
        {row.map(function(cell) {
          return <td>{cell}</td>;
        })}
      </tr>
    );
  });
}

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
              <table className="table table-condensed table-header-rotated">
                <thead>
                  <tr>
                    <th className="rotate-45"><div><span></span></div></th>
                  </tr>
                </thead>
                <tbody>
                  {slpData(projects)}
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
                {slpData(data)}
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
                {slpData(data)}
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
                {slpData(data)}
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
