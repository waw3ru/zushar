/*
* created by waweru
* */

'use strict';

const express = require('express');
const Router = express.Router();
const userModel = require('./model');

Router.get('/', function (req, res) {
    res.json({ module: 'users' });
});

module.exports = Router;