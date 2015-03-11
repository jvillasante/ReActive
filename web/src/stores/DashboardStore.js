'use strict';

/**
 * DashboardStore
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var moment = require('moment');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var CHANGE_EVENT = 'dashboard_store_change';

var error = null;
var data = {
  selectValues: null,
  startDate: moment().subtract(29, 'days'),
  endDate: moment(),
  table1: [],
  table2: [],
  table3: [],
  benchmarkTable: []
};
var reportData = {
  project: '',
  data: []
};

function setError(err) {
  error = err;
}

function setData(res) {
  error = null;
  var projectsData = res.data.projects;
  var projects = Object.keys(projectsData);

  if (projects[0].length === 0) {
    data = {
      selectValues: null,
      startDate: res.start,
      endDate: res.end,
      table1: [],
      table2: [],
      table3: [],
      benchmarkTable: []
    };
  } else {
    var table1 = [], table2 = [], table3 = [], benchmarkTable = [];
    projects.forEach(function(project) {
      table1.push(projectsData[project].table1);
      table2.push(projectsData[project].table2);
      table3.push(projectsData[project].table3);
      benchmarkTable.push(projectsData[project].benchmarkTable.map(function(val, index) {
        if (index === 9) {
          return (projectsData[project].benchmarkTable[7] * projectsData[project].benchmarkTable[8]).toFixed(2);
        } else {
          return val;
        }
      }));
    });

    data = {
      selectValues: projects.join('|'),
      startDate: res.start,
      endDate: res.end,
      table1: table1,
      table2: table2,
      table3: table3,
      benchmarkTable: benchmarkTable
    };
  }
}

function setReportData(res) {
  reportData = {
    project: res.project,
    data: res.data.data
  };
}

var DashboardStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getError: function() {
    return error;
  },

  getProjects: function() {
    return data.projects;
  },

  getSelectValues: function() {
    return data.selectValues;
  },

  getStartDate: function() {
    return data.startDate;
  },

  getEndDate: function() {
    return data.endDate;
  },

  getTable1: function() {
    return data.table1;
  },

  getTable2: function() {
    return data.table2;
  },

  getTable3: function() {
    return data.table3;
  },

  getBenchmarkTable: function() {
    return data.benchmarkTable;
  },

  getProjectName: function() {
    return reportData.project;
  },

  getReportsData: function() {
    return reportData.data;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.DASHBOARD_DATA_LOAD:
      setData(action.data);
      DashboardStore.emitChange();
      break;
    case ActionTypes.DASHBOARD_DATA_LOAD_ERROR:
      setError(action.error);
      DashboardStore.emitChange();
      break;
    case ActionTypes.DASHBOARD_REPORTS_DATA_LOAD:
      setReportData(action.data);
      DashboardStore.emitChange();
      break;
    case ActionTypes.DASHBOARD_REPORTS_DATA_LOAD_ERROR:
      setError(action.error);
      DashboardStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = DashboardStore;
