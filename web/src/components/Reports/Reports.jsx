'use strict';

require('./Reports.less');
var React = require('react');
var Authentication = require('../../mixins/Authentication');
var Router = require('react-router');

var Reports = React.createClass({
  mixins: [Router.State, Authentication],

  render: function() {
    var params = this.getParams();
    var query = this.getQuery();
    console.log(params, query);

    return (
      <div className="container">
        <div className="row">
          <p>Project: ...</p>
          <p>Table Name: ...</p>
          <p>ColumnName: ...</p>
          <p>DateRange: ...</p>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="box">
              <div className="box-icon">
                <span className="fa fa-4x fa-html5"></span>
              </div>
              <div className="info">
                <h4 className="text-center">Title</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti atque, tenetur quam aspernatur corporis at explicabo nulla dolore necessitatibus doloremque exercitationem sequi dolorem architecto perferendis quas aperiam debitis dolor soluta!</p>
                <a href="#" className="btn">Link</a>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="box">
              <div className="box-icon">
                <span className="fa fa-4x fa-css3"></span>
              </div>
              <div className="info">
                <h4 className="text-center">Title</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti atque, tenetur quam aspernatur corporis at explicabo nulla dolore necessitatibus doloremque exercitationem sequi dolorem architecto perferendis quas aperiam debitis dolor soluta!</p>
                <a href="#" className="btn">Link</a>
              </div>
            </div>
          </div>
      </div>
    </div>
    );
  },
});

module.exports = Reports;
