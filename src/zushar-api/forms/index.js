/*
* created by waweru
* */

'use strict';


const express = require('express');
const Router = express.Router();
const _ = require('lodash');
const formsModel = require('./model');

/*
* @path: '/',
* @method: POST
* @route: add a new form
* */
Router.post('/', 
    function (req, res, next) {
        if (!_.isEmpty(req.body.name)) {
            let date = new Date();
            let error = new Error(`${date.toDateString()}:: some inputs are invalid please try again`);
            res.status(500);
            res.json({error});
        }
        else {
            formsModel
                .createForm(
                    Object.assign({}, req.body, {
                        author: req.zushar_auth.id
                    }),
                    function (error, results) {
                        if (!_.isNil(error)) {
                            res.status(500);
                            res.json({error});
                        }
                        res.json(results);
                    });
        }
        
    });

/*
* @path: '/forms',
* @method: POST
* @route: get form list
* */
Router.get('/forms/:account/:account_type',
    function (req, res, next) {
        
    });

module.exports = Router;