/*
* created by waweru
* */

'use strict';

const path = require('path');
const winston = require('winston');

const Logger = new (winston.Logger)({
  transports: [
        new (winston.transports.Console)({ level: 'debug', colorize: true }),
        new (winston.transports.File)({
            name: '<zushar:api/warnings>',
            level: 'warn',
            prettyPrint: true,
            filename: path.resolve(__dirname, '../../../logs/api-warn.log')
        }),
        new (winston.transports.File)({
            name: 'zushar:api/error',
            level: 'error',
            prettyPrint: true,
            filename: path.resolve(__dirname, '../../../logs/api-error.log')
        })
  ]
});

module.exports = Logger;