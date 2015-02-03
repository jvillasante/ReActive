'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;
var moment = require('moment');
var Select = require('react-select');
var DateRangePicker = require('react-bootstrap-daterangepicker');
var Api = require('../../utils/Api');
var GlobalReportTable = require('./GlobalReportTable');

var getSelectOptions = function(input, callback) {
  Api.getProjects(function(res) {
    var options = [];
    res.projects.forEach(function(project) {
      options.push({ id: project.id, value: project.name, label: project.name });
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
      selectedValues: null,
      selectedOptions: [],
      startDate: moment().subtract(29, 'days'),
      endDate: moment()
    };
  },

  handleDatePickerEvent: function(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
  },

  handleSelectChange: function(val, selectedOptions) {
    this.setState({
      selectedValues: (val === '') ? null : val,
      selectedOptions: selectedOptions
    });
  },

  render: function() {
    var start = this.state.startDate.format('DD/MM/YYYY');
    var end = this.state.endDate.format('DD/MM/YYYY');
    var label = start + ' - ' + end;
    if (start === end) { label = start; }

    return (
      <div className="project-input">
        <Panel header={<h1>Seleccione rango de fecha y proyectos</h1>} bsStyle="info">
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
              value={this.state.selectedValues}
              multi={true}
              delimiter="|"
              asyncOptions={getSelectOptions}
              onChange={this.handleSelectChange} />
          </div>
        </Panel>

        <GlobalReportTable />
      </div>
    );
  },
});

module.exports = ProjectInput;
