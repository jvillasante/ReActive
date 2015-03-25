'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;
var TabbedArea = ReactBootstrap.TabbedArea;
var TabPane = ReactBootstrap.TabPane;
var moment = require('moment');
var Select = require('react-select');
var DateRangePicker = require('react-bootstrap-daterangepicker');
var Api = require('../../utils/Api');
var SessionStore = require('../../stores/SessionStore');
var DashboardActions = require('../../actions/DashboardActions');
var DashboardStore = require('../../stores/DashboardStore');
var GlobalReportTable = require('./GlobalReportTable');
var GraphicsComponent = require('./Graphics');
var BenchmarkTable = require('./BenchmarkTable');

var getSelectOptions = function(input, callback) {
  Api.getProjects(function(res) {
    var options = res.projects.map(function(project) {
      return { id: project.id, value: project.name, label: project.name };
    });

    callback(null, {
      options: options,
      complete: true
    });
  }, function(err) {
    callback(err);
  });
};

var datePicker = {
  locale: {
    applyLabel: 'Aceptar',
    cancelLabel: 'Cancelar',
    fromLabel: 'Desde',
    toLabel: 'Hasta',
    weekLabel: 'S',
    customRangeLabel: 'Rango Personalizado',
    monthsNames: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    daysOfWeek: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
  },
  ranges: {
    'Hoy': [moment(), moment()],
    'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Ultimos 7 Dias': [moment().subtract(6, 'days'), moment()],
    'Ultimos 30 Dias': [moment().subtract(29, 'days'), moment()],
    'Este Mes': [moment().startOf('month'), moment().endOf('month')],
    'Mes Anterior': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
};

var ProjectInput = React.createClass({
  getInitialState: function() {
    return {
      selectValues: DashboardStore.getSelectValues(),
      startDate: DashboardStore.getStartDate(),
      endDate: DashboardStore.getEndDate(),
      table1: DashboardStore.getTable1(),
      table2: DashboardStore.getTable2(),
      table3: DashboardStore.getTable3(),
      benchmarkTable: DashboardStore.getBenchmarkTable()
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
      selectValues: DashboardStore.getSelectValues(),
      startDate: DashboardStore.getStartDate(),
      endDate: DashboardStore.getEndDate(),
      table1: DashboardStore.getTable1(),
      table2: DashboardStore.getTable2(),
      table3: DashboardStore.getTable3(),
      benchmarkTable: DashboardStore.getBenchmarkTable()
    });
  },

  handleDatePickerEvent: function(event, picker) {
    DashboardActions.loadData(picker.startDate, picker.endDate, this.state.selectValues);
  },

  handleSelectChange: function(val) {
    DashboardActions.loadData(this.state.startDate, this.state.endDate, val);
  },

  render: function() {
    var emp = SessionStore.getUser().emp;
    var start = this.state.startDate.format('DD/MM/YYYY');
    var end = this.state.endDate.format('DD/MM/YYYY');
    var label = start + ' - ' + end;
    if (start === end) { label = start; }

    return (
      <div>
        <div className="project-input">
          <Panel header={<h1>{{emp}} - Seleccione rango de fecha y proyectos</h1>}>
            <div className="project-input-daterange col-md-3">
              <DateRangePicker
                locale={datePicker.locale}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                ranges={datePicker.ranges}
                onEvent={this.handleDatePickerEvent}>
                <Button className="selected-date-range-btn">
                  <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                  <div className="pull-right">
                    <span> {label} </span>
                    <span className="caret"></span>
                  </div>
                </Button>
              </DateRangePicker>
            </div>
            <div className="project-input-select col-md-9">
              <Select
                placeholder="Seleccione Proyecto"
                name="project-input-select"
                asyncOptions={getSelectOptions}
                value={this.state.selectValues}
                multi={true}
                delimiter="|"
                onChange={this.handleSelectChange} />
            </div>
          </Panel>

          <div className="container">
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab="AUTOEVALUACION ESTANDAR LEAN">
                <GlobalReportTable
                  projects={this.state.selectValues}
                  table1={this.state.table1}
                  table2={this.state.table2}
                  table3={this.state.table3} />

                <GraphicsComponent kind="autoevaluacion" />
              </TabPane>
              <TabPane eventKey={2} tab="BENCHMARK">
                <BenchmarkTable
                  projects={this.state.selectValues}
                  benchmarkTable={this.state.benchmarkTable} />

                <GraphicsComponent kind="benchmark" />
              </TabPane>
            </TabbedArea>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = ProjectInput;
