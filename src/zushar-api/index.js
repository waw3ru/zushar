/*
* created by waweru
* */

'use strict';

const express = require('express');
const Router = express.Router();


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

module.exports = Router;