'use strict';

require('./Dashboard.less');
var React = require('react');
var Authentication = require('../../mixins/Authentication');
var ProjectInput = require('./ProjectInput');

var Dashboard = React.createClass({
  mixins: [Authentication],

  render: function() {
    return (
      <ProjectInput />
    );
  },
});

module.exports = Dashboard;
