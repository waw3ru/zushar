/*
* created by waweru
* */

'use strict';


const express = require('express');
const Router = express.Router();
const formsModel = require('./model');

Router.get('/', function (req, res) {
    res.json({ module: 'forms' });
});

module.exports = Router;