'use strict';

var fs = require('fs');
var plan = require('flightplan');
var tempDir = 'reactiveweb-' + new Date().getTime();

plan.target('production', {
  host: 'reactive.innobis.cl',
  username: 'ubuntu',
  port: 22,
  privateKey: '/home/jvillasante/.ssh/ReActive.pem'
});

// run commands on localhost
plan.local(function(local) {
  local.log('Run build');
  local.exec('gulp build --release');

  local.log('Copy files to remote host');
  var filesToCopy = local.exec('find build/', {silent: true});

  // rsync files to remote host
  local.transfer(filesToCopy, '/tmp/' + tempDir);
});

plan.remote(function(remote) {
  remote.log('Move folder to web root');
  remote.sudo('cp -R /tmp/' + tempDir + ' ~/ReActive/tmp/', { user: 'ubuntu' });
  remote.rm('-rf /tmp/' + tempDir);

  remote.log('Roload application');
  remote.sudo('ln -snf ~/ReActive/tmp/' + tempDir + ' ~/ReActive/web', {user: 'ubuntu'});
});
