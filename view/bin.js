/*
* created by waweru
* */

'use strict';

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const debug = require('debug')('zushar');
const app = require('../index.js');

const appRun = () => {
  app.set('port', process.env.PORT || 3000);

  let server = app.listen(app.get('port'), function() {
      console.log(`<zushar:server> Listening to port: ${server.address().port}`)
      debug('Express server listening on port ' + server.address().port);
  });

  server.on('error', (error) => {

    if (error.syscall !== 'listen') {
      throw error;
    }

    switch (error.code) {

      case 'EACCES':
        console.error('Port requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error('Port is already in use');
        process.exit(1);
        break;
      default:
        throw error;

    }

  });
};

const clusterRun = () => {
  if (cluster.isMaster) {

    cluster.on("fork", function (worker) {
        console.log("Attempting to acquire worker" + worker.id);
      });

      cluster.on("online", function (worker) {
        console.log("Successfully acquired worker" + worker.id);
      });

      cluster.on("disconnect", function (worker) {
        console.log("Worker " + worker.id + " disconnected");
      });

      var init;

      for (init = 0; init < numCPUs; init++) {
        console.log('Acquiring child processes');
        cluster.fork();
      }

  } else {
    appRun();
  }

};

if (process.env.NODE_ENV!=='production') appRun();
if (process.env.NODE_ENV==='production') clusterRun();
