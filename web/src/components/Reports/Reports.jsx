'use strict';

require('./Reports.less');
var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Panel = ReactBootstrap.Panel;
var Authentication = require('../../mixins/Authentication');
var Router = require('react-router');
var DashboardStore = require('../../stores/DashboardStore');

var Reports = React.createClass({
  mixins: [Router.State, Authentication],

  getInitialState: function() {
    return {
      project: DashboardStore.getProjectName(),
      data: DashboardStore.getReportsData()
    };
  },

  componentDidMount: function() {
    DashboardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashboardStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      project: DashboardStore.getProjectName(),
      data: DashboardStore.getReportsData()
    });
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <Panel header={<h1>{this.state.project}</h1>}>
            <div className="project-input-daterange col-md-12">
              <p>Documento: (Sistema Last Planner o lo que sea)</p>
              <p>Seccion: (Participacion en Reunion o lo que sea)</p>
              <p>Rango de Fechas: (El rango de fechas segun marcado en el dashboard)</p>
            </div>
          </Panel>

          {this.state.data.map(function(row, rowIndex) {
            return (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="box">
                  <span className="pull-right">(Nombre del usuario que lo creo)</span>
                  <span className="pull-left">(Ultima actualizacion del reporte)</span>
                  <div className="box-icon">
                    <span><img className="img-responsive img-circle" src={"http://reactive.innobis.cl/" + row.userImage} alt="Test Image" /></span>
                  </div>
                  <div className="info">
                    <h4 className="text-center">{row.title}</h4>
                    <ul className="list-group">
                      {row.data.map(function(row, rowIndex) {
                        return (
                          <li className="list-group-item">
                            <span className="badge">{row.answer}</span>
                            {row.question}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
    );
  },
});

module.exports = Reports;
