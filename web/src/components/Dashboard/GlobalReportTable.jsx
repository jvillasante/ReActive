'use strict';

var React = require('react');

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
                {this.props.table1.map(function(row) {
                  return (
                    <tr>
                      {row.map(function(cell) {
                        return <td className={'cell-' + cell}>{cell}</td>;
                      })}
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
                {this.props.table2.map(function(row) {
                  return (
                    <tr>
                      {row.map(function(cell) {
                        return <td className={'cell-' + cell}>{cell}</td>;
                      })}
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
                {this.props.table3.map(function(row) {
                  return (
                    <tr>
                      {row.map(function(cell) {
                        return <td className={'cell-' + cell}>{cell}</td>;
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
