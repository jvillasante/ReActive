'use strict';

var React = require('react');
var Router = require('react-router');

var GeneralTable = React.createClass({
  mixins: [Router.Navigation],

  _onTableCellClick: function(projectName, colNumber, tableName, evt) {
    evt.preventDefault();
    this.transitionTo('reports', {
      projectName: projectName,
      colNumber: colNumber,
      tableName: tableName
    });
  },

  render: function() {
    var self = this;
    var projects = (this.props.projects) ? this.props.projects.split('|') : [];

    return (
      <div className="global-report-box">
        <div className="card-charts main-card">
          <div className="main-card-header clearfix">
            <div className="main-card-title">
              AUTOEVALUACION ESTANDAR LEAN
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
                  {projects.map(function(row) {
                    return <tr><td>{row}</td></tr>;
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3">
            <h3 className="sub-header">Sistema Last Planner</h3>
            <div className="table-responsive">
            <table className="table table-condensed table-header-rotated general-data-table">
              <thead>
                <tr>
                  <th className="rotate-45"><div><span>Participaci&oacute;n Reuni&oacute;n</span></div></th>
                  <th className="rotate-45"><div><span>Registros e Indicadores</span></div></th>
                  <th className="rotate-45"><div><span>Planificaci&oacute;n Semana Anterior</span></div></th>
                  <th className="rotate-45"><div><span>Plan Intermedio</span></div></th>
                  <th className="rotate-45"><div><span>Planificaci&oacute;n Semanal</span></div></th>
                </tr>
              </thead>
              <tbody>
                {this.props.table1.map(function(row, rowIndex) {
                  return (
                    <tr>
                      {row.map(function(cell, colIndex) {
                        return (
                          <td className={'cell-' + cell}>
                            <a href="#" onClick={self._onTableCellClick.bind(self, projects[rowIndex], colIndex, "Sistema Last Planner")}>
                              {cell}
                            </a>
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
          <div className="col-md-3">
            <h3 className="sub-header">M&eacute;todo 6S Bodega</h3>
            <div className="table-responsive">
            <table className="table table-condensed table-header-rotated general-data-table">
              <thead>
                <tr>
                  <th className="rotate-45"><div><span>S1 - Separar Lo Innecesario</span></div></th>
                  <th className="rotate-45"><div><span>S2 - Situar Lo Necesario</span></div></th>
                  <th className="rotate-45"><div><span>S3 - Suprimir Suciedad</span></div></th>
                  <th className="rotate-45"><div><span>S4 - Se&ntilde;alizar Anomal&iacute;as</span></div></th>
                  <th className="rotate-45"><div><span>S5 - Seguir Mejorando</span></div></th>
                  <th className="rotate-45"><div><span>S6 - Seguridad</span></div></th>
                </tr>
              </thead>
              <tbody>
                {this.props.table2.map(function(row, rowIndex) {
                  return (
                    <tr>
                      {row.map(function(cell, colIndex) {
                        return (
                          <td className={'cell-' + cell}>
                            <a href="#" onClick={self._onTableCellClick.bind(self, projects[rowIndex], colIndex, "Método 6S Bodega")}>
                              {cell}
                            </a>
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
          <div className="col-md-3">
            <h3 className="sub-header">Pr&aacute;cticas Lean</h3>
            <div className="table-responsive">
            <table className="table table-condensed table-header-rotated general-data-table">
              <thead>
                <tr>
                  <th className="rotate-45"><div><span>Checklist Se&ntilde;al&eacute;tica</span></div></th>
                  <th className="rotate-45"><div><span>Checklist Seguridad y Protecciones</span></div></th>
                  <th className="rotate-45"><div><span>Checklist V&iacute;as de Acceso</span></div></th>
                  <th className="rotate-45"><div><span>Cehcklist Log&iacute;stica</span></div></th>
                  <th className="rotate-45"><div><span>Checklist Tierra, Escombros y Basura</span></div></th>
                  <th className="rotate-45"><div><span>Sello Manquehue</span></div></th>
                </tr>
              </thead>
              <tbody>
                {this.props.table3.map(function(row, rowIndex) {
                  return (
                    <tr>
                      {row.map(function(cell, colIndex) {
                        return (
                          <td className={'cell-' + cell}>
                            <a href="#" onClick={self._onTableCellClick.bind(self, projects[rowIndex], colIndex, "Prácticas Lean")}>
                              {cell}
                            </a>
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

module.exports = GeneralTable;
