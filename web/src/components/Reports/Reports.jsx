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
      doc: DashboardStore.getDocName(),
      section: DashboardStore.getSectionName(),
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
      doc: DashboardStore.getDocName(),
      section: DashboardStore.getSectionName(),
      data: DashboardStore.getReportsData()
    });
  },

  render: function() {
    return (
      <div className="project-input">
        <Panel header={<h1>{this.state.project}</h1>}>
          <div className="project-input-daterange col-md-12">
            <span className="pull-left">
              <h3>{this.state.doc}: {this.state.section}</h3>
            </span>
            <span className="pull-right">
              <h3>{DashboardStore.getStartDate().format('DD/MM/YYYY') + ' - ' + DashboardStore.getEndDate().format('DD/MM/YYYY')}</h3>
            </span>
          </div>
        </Panel>
        <div className="container">
          {this.state.data.map(function(report) {
            return (
              <div key={report.id} className="col-sm-6 col-md-6 col-lg-6">
                <div className="box">
                  <div className="box-icon">
                    <span><img className="img-responsive img-circle" src={"http://reactive.innobis.cl/" + report.userImage} alt="User Image" /></span>
                  </div>
                  <div className="info">
                    <h4 className="text-center">{report.title}</h4>
                    <span className="pull-right">Creaci&oacute;n: {report.created}</span><br />
                    <span className="pull-right">Ultima Actualizaci&oacute;n: {report.updated}</span><br />
                    <span className="pull-right">Usuario: {report.userName}</span><br />
                    <ul className="list-group">
                      {report.data.map(function(value) {
                        return (
                          <li className="list-group-item">
                            <span className={value.className}>{value.answer}</span>
                            {value.question}
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
