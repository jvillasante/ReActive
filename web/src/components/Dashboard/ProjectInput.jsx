'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;
var moment = require('moment');
var Select = require('react-select');
var DateRangePicker = require('react-bootstrap-daterangepicker');
var GlobalReportTable = require('./GlobalReportTable');
var Api = require('../../utils/Api');
var DashboardActions = require('../../actions/DashboardActions');
var DashboardStore = require('../../stores/DashboardStore');

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
      selectValues: null,
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      table1: [],
      table2: [],
      table3: [],
    };
  },

  componentDidMount: function() {
    DashboardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashboardStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var data = DashboardStore.getProjects();

    var table1 = [], table2 = [], table3 = [];
    var projects = Object.keys(data);
    projects.forEach(function(project) {
      table1.push(data[project].table1);
      table2.push(data[project].table2);
      table3.push(data[project].table3);
    });

    this.setState({
      selectValues: projects.join('|'),
      table1: table1,
      table2: table2,
      table3: table3
    });
  },

  handleDatePickerEvent: function(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
  },

  handleSelectChange: function(val, selectedOptions) {
    DashboardActions.loadData(val);
  },

  render: function() {
    var start = this.state.startDate.format('DD/MM/YYYY');
    var end = this.state.endDate.format('DD/MM/YYYY');
    var label = start + ' - ' + end;
    if (start === end) { label = start; }

    return (
      <div className="project-input">
        <Panel header={<h1>Seleccione rango de fecha y proyectos</h1>}>
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

        <GlobalReportTable
          projects={this.state.selectValues}
          table1={this.state.table1}
          table2={this.state.table2}
          table3={this.state.table3} />
      </div>
    );
  },
});

module.exports = ProjectInput;
