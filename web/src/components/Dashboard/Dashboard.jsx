'use strict';

require('./Dashboard.less');
var React = require('react');
var Authentication = require('../../mixins/Authentication');
var ProjectInput = require('./ProjectInput');
var Graphics = require('./Graphics');

var Dashboard = React.createClass({
  mixins: [Authentication],

  render: function() {
    return (
      <div>
        <ProjectInput />
        <Graphics />
      </div>
    );
  },
});

module.exports = Dashboard;
