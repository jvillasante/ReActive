'use strict';

require('./Dashboard.less');
var React = require('react');
var Griddle = require('griddle-react');
var ReactBootstrap = require('react-bootstrap');
var TabbedArea = ReactBootstrap.TabbedArea;
var TabPane = ReactBootstrap.TabPane;

var columnMetadata = [
  {
    columnName: "label",
    displayName: "Nombre del Proyecto"
  }
];

var sistemaLastPlanner = {
  columns: ['column1', 'column2', 'column3', 'column4', 'column5'],
  columnMetadata: [
    {
      columnName: 'column1',
      displayName: 'Participacion Reunion',
      cssClassName: 'column-class'
    },
    {
      columnName: 'column2',
      displayName: 'Registros e Indicaciones'
    },
    {
      columnName: 'column3',
      displayName: 'Planificacion Semana Anterior'
    },
    {
      columnName: 'column4',
      displayName: 'Plan Intermedio'
    },
    {
      columnName: 'column5',
      displayName: 'Planificacion Semanal'
    }
  ],
  results: [
    {
      column1: 40,
      column2: 60,
      column3: 80,
      column4: 100,
      column5: 75
    },
    {
      column1: 40,
      column2: 60,
      column3: 80,
      column4: 100,
      column5: 75
    },
    {
      column1: 40,
      column2: 60,
      column3: 80,
      column4: 100,
      column5: 75
    },
    {
      column1: 40,
      column2: 60,
      column3: 80,
      column4: 100,
      column5: 75
    },
  ],
};

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
          <div className="global-report-projects">
            <h1>Proyectos</h1>
            <Griddle
              results={this.props.data}
              columns={["label"]}
              columnMetadata={columnMetadata}
              resultsPerPage={8}
              nextText="Siguiente"
              previousText="Anterior"
            />
          </div>
          <div className="global-report-tabs">
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab="Sistema Last Planner">
                <Griddle
                  results={sistemaLastPlanner.results}
                  columns={sistemaLastPlanner.columns}
                  columnMetadata={sistemaLastPlanner.columnMetadata}
                  resultsPerPage={8}
                  nextText="Siguiente"
                  previousText="Anterior"
                />
              </TabPane>
              <TabPane eventKey={2} tab="Método 6S Bodega">
              </TabPane>
              <TabPane eventKey={3} tab="Prácticas Lean">
              </TabPane>
            </TabbedArea>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = GeneralTable;
