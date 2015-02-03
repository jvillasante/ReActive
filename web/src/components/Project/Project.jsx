'use strict';

var React = require('react');
var Authentication = require('../../mixins/Authentication');

var Project = React.createClass({
  mixins: [Authentication],

  render: function() {
    return (
      <div className="example-page">
        <h3>Projects Admin</h3>
        <p>aqui van las cosas de projectos...</p>
      </div>
    );
  },
});

module.exports = Project;
