'use strict';

const
  _ = require('lodash'),
  errTo = require('errto'),
  Err = require('custom-err'),
  DashboardProvider = require('../data/dashboardProvider').DashboardProvider;

exports.allProjects = function(req, res, next) {//{{{
  let dashboardProvider = new DashboardProvider(req.connectionStr);
  let userEmp = req.user.emp;

  dashboardProvider.findAllProjects(userEmp, errTo(next, function(result) {
    if (!result || result.length <= 0) {
      return next(Err("projects not found", { code: 404, description: "No projects found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send(result);
  }));
};//}}}

exports.getProjectData = function(req, res, next) {//{{{
  let dashboardProvider = new DashboardProvider(req.connectionStr);
  let start = req.query.start;
  let end = req.query.end;
  let projects = req.query.projects.split('|');

  dashboardProvider.findProjectData(start, end, projects, errTo(next, function(result) {
    if (!result) {
      return next(Err("project data not found", { code: 404, description: "No project data found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send(result);
  }));
};//}}}

exports.getProjectDataForGraphic = function(req, res, next) {//{{{
  let dashboardProvider = new DashboardProvider(req.connectionStr);
  let tableNumber = req.query.tableNumber;
  let start = req.query.start;
  let end = req.query.end;
  let project = req.query.project;

  dashboardProvider.findProjectDataForGraphic(tableNumber, start, end, project, errTo(next, function(result) {
    if (!result) {
      return next(Err("project data not found", { code: 404, description: "No project data found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send(result);
  }));
};//}}}

exports.getProjectReports = function(req, res, next) {//{{{
  let dashboardProvider = new DashboardProvider(req.connectionStr);
  let templateId = req.query.templateId;
  let col = req.query.col;
  let start = req.query.start;
  let end = req.query.end;
  let project = req.query.project;

  dashboardProvider.findProjectReports(templateId, col, start, end, project, errTo(next, function(result) {
    if (!result) {
      return next(Err("project data not found", { code: 404, description: "No project data found for user: " + req.user.username + ".", errors: []}));
    }

    res.status(200).send(result);
  }));
}//}}}
