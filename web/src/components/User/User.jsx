'use strict';

var React = require('react');
var Authentication = require('../../mixins/Authentication');
var SessionStore = require('../../stores/SessionStore');

var User = React.createClass({
  mixins: [Authentication],

  render: function() {
    var user = SessionStore.getSession().user;

    return (
      <div className="example-page">
        <h3>{user.username}</h3>
        <p>aqui van las cosas de usuarios...</p>
      </div>
    );
  },
});

module.exports = User;
