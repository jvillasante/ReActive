'use strict';

require('./Dashboard.less');
var React = require('react');

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
        </div>
      </div>
    );
  },
});

module.exports = GeneralTable;
