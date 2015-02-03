'use strict';

require('./Home.less');
var React = require('react');

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>Innobis</h1>
            <p>ReActive Web Client</p>
          </div>
        </div>

        <div className="container">
          <h1>Lorem ipsum dolor sit amet</h1>
          <p className="lead">
            In hac habitasse platea dictumst. Duis sagittis dui ac ex suscipit maximus. Morbi pellentesque
            venenatis felis sed convallis. Nulla varius, nibh vitae placerat tempus, mauris sem elementum ipsum,
            eget sollicitudin nisl est vel purus. Fusce malesuada odio velit, non cursus leo fermentum id. Cras
            pharetra sodales fringilla. Etiam quis est a dolor egestas pellentesque. Maecenas non scelerisque
            purus, congue cursus arcu. Donec vel dapibus mi. Mauris maximus posuere placerat. Sed et libero eu
            nibh tristique mollis a eget lectus. Donec interdum augue sollicitudin vehicula hendrerit. Vivamus
            justo orci, molestie ac sollicitudin ac, lobortis at tellus. Etiam rhoncus ullamcorper risus eu
            tempor. Sed porttitor, neque ac efficitur gravida, arcu lacus pharetra dui, in consequat elit tellus
            auctor nulla. Donec placerat elementum diam, vitae imperdiet lectus luctus at.
          </p>
        </div>
      </div>
    );
  },
});

module.exports = Home;
