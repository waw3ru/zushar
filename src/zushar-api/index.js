/*
* created by waweru
* */

'use strict';

const express = require('express');
const Router = express.Router();

/*
* @desc:
*   api configurations and library settings
* */
const mongoURL = (process.env.NODE_ENV==='production') ? process.env.MONGODB_URL : 'mongodb://localhost:27017/zushar'
require('./lib/database')((mongoURL), {
  "db": {
    "native_parse": true
  },
  "server": {
    "poolSize": 15
  }
});
require('./lib/logger').debug('Welcome to the zushar web services api.');

/*
* @desc:
*   api endpoints
* */
Router.get('/', (req, res) => {
  
  res.json({
    message: 'Welcome to the zushar backend services for the tool. :)',
    app: 'zushar web services',
    version: process.env.VERSION,
    author: 'John Waweru <wambugu.john.waweru@outlook.com>',
    license: process.env.LICENSE,
  });
});

/*
* @desc:
*   user management services
* */
Router.get('user', (req, res) => {
  res.send('Hello user!');
});

/*
* @desc:
*   forms management services
* */
Router.get('forms', (req, res) => {
    res.send('Hello we are in forms!');
});

//# expose api to the web server
module.exports = Router;