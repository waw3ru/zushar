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
* @path: '/forms/:account/:account_type',
* @params: ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: GET
* @route: get form list
* */
Router.get('/:account/:account_type',
    function (req, res, next) {
        
    });

/*
* @path: '/forms/:id/:account/:account_type',
* @params: ':id' -> ObjectId; ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: GET
* @route: get form object
* */
Router.get('/:account/:account_type/:id',
    function (req, res, next) {
        
    });

/*
* @path: '/forms/:id/:account/:account_type',
* @params: ':id' -> ObjectId; ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: PUT
* @route: update a form
* */
Router.put('/:account/:account_type/:id',
    function (req, res, next) {
        
    });

/*
* @path: '/forms/:id/:account/:account_type',
* @params: ':id' -> ObjectId; ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: DELETE
* @route: marks form for deletion
* */
Router.delete('/:account/:account_type/:id',
    function (req, res, next) {
        
    });

module.exports = Router;