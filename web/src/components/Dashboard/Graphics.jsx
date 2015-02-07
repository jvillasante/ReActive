'use strict';

require('./Dashboard.less');
var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Graphics = React.createClass({
  render: function() {
    return (
      <div className="container dashboard-graphics">
        <div className="row">
          <div className="col-md-4">
            <div className="card-charts small-card">
              <div className="main-card-header">
                <div className="icon-card-header">
                  <span className="glyphicon glyphicon-th"></span>
                </div>
                <div className="card-title">
                  Nombre de Gráfico
                </div>
              </div>
              <img className="img-responsive img-rounded" src="images/s01.jpg" alt="" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-charts small-card">
              <div className="main-card-header">
                <div className="icon-card-header">
                  <span className="glyphicon glyphicon-th"></span>
                </div>
                <div className="card-title">
                  Nombre de Gráfico
                </div>
              </div>
              <img className="img-responsive img-rounded" src="images/s02.jpg" alt="" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-charts small-card">
              <div className="main-card-header">
                <div className="icon-card-header">
                  <span className="glyphicon glyphicon-th"></span>
                </div>
                <div className="card-title">
                  Nombre de Gráfico
                </div>
              </div>
              <img className="img-responsive img-rounded" src="images/s03.jpg" alt="" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-charts small-card">
              <div className="main-card-header">
                <div className="icon-card-header">
                  <span className="glyphicon glyphicon-th"></span>
                </div>
                <div className="card-title">
                  Nombre de Gráfico
                </div>
              </div>
              <img className="img-responsive img-rounded" src="images/s04.jpg" alt="" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-charts small-card">
              <div className="main-card-header">
                <div className="icon-card-header">
                  <span className="glyphicon glyphicon-th"></span>
                </div>
                <div className="card-title">
                  Nombre de Gráfico
                </div>
              </div>
              <img className="img-responsive img-rounded" src="images/s05.jpg" alt="" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-charts small-card">
              <div className="main-card-header">
                <div className="icon-card-header">
                  <span className="glyphicon glyphicon-th"></span>
                </div>
                <div className="card-title">
                  Nombre de Gráfico
                </div>
              </div>
              <img className="img-responsive img-rounded" src="images/s06.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Graphics;
