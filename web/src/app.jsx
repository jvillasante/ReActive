'use strict';

Highcharts.setOptions({
  lang: {
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  }
});

var React = require('react');
var Router = require('react-router');
var AppRoutes = require('./app-routes.jsx');

Router.create({
  routes: AppRoutes,
  scrollBehavior: Router.ScrollToTopBehavior
}).run(function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
