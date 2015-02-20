'use strict';

var fs = require('fs');
var plan = require('flightplan');
var tempDir = 'reactiveapi-' + new Date().getTime();

plan.target('production', {
  host: 'reactive.innobis.cl',
  username: 'ubuntu',
  port: 22,
  privateKey: '/home/jvillasante/.ssh/ReActive.pem'
});

// run commands on localhost
plan.local(function(local) {
  local.log('Copy files to remote host');
  var filesToCopy = local.exec('git ls-files', {silent: true});

  // rsync files to remote host
  local.transfer(filesToCopy, '/tmp/' + tempDir);
});

plan.remote(function(remote) {
  remote.log('Remove old api');
  remote.rm('-rf ~/ReActive/tmp/reactiveapi*');

  remote.log('Move folder to api root');
  remote.sudo('cp -R /tmp/' + tempDir + ' ~/ReActive/tmp/', { user: 'ubuntu' });
  remote.rm('-rf /tmp/' + tempDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/ReActive/tmp/' + tempDir + ' install ~/ReActive/tmp/' + tempDir, { user: 'ubuntu' });

  remote.log('Create link to api application');
  remote.sudo('ln -snf ~/ReActive/tmp/' + tempDir + ' ~/ReActive/api', {user: 'ubuntu'});

  remote.log('Roload application');
  remote.sudo('pm2 reload all', { user: 'ubuntu' });
});
