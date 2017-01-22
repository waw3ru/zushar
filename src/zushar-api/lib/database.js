/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connection = mongoose.connection;
const logger = require('./logger');

const gracefulShutdown = (message, done) => {
    connection.close(function () {
        logger.debug('Mongoose disconnected through ' + message);
        done();
    });
};

connection.on('error', (error) => {
  logger.error(error);
  mongoose.disconnect();
});

connection.once('open', () => {
  logger.debug('Successfully connected to zushar database');
});

connection.on('disconnected', function () {
  logger.debug('disconnected to database successfully');
});

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

// all the models

module.exports = (url, opts) => {
  mongoose.connect(url, opts);
};
