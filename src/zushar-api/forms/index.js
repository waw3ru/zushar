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
                    Object.assign({}, req.body.form, {
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
Router.get('/:user_id/:user_type',
    function (req, res, next) {
        let formUser = {
            account_id: req.params.user_id,
            account: req.params.user_type
        };

        formsModel
            .getForms(formUser, 
                function (error, results) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }

                    res.json(results);
                });
    });

/*
* @path: '/forms/:id/:account/:account_type',
* @params: ':id' -> ObjectId; ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: GET
* @route: get form object
* */
Router.get('/:form_id',
    function (req, res, next) {
        formsModel
            .getForm(req.params.form_id, 
                function (error, result) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }

                    res.json(result);
                });
    });

/*
* @path: '/forms/:id/:account/:account_type',
* @params: ':id' -> ObjectId; ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: PUT
* @route: update a form
* */
Router.put('/:form_id/:user_id/:user_type',
    function (req, res, next) {
        let { form_id, user_id, user_type } = req.params;
        formsModel
            .updateForm({
                id: form_id,
                account_id: user_id,
                account: user_type
            },
            req.body.form,
            function (error, results) {
                if (!_.isNil(error)) {
                    res.status(500);
                    res.json({error});
                }

                res.json(result);
            });
    });

/*
* @path: '/forms/:id/:account/:account_type',
* @params: ':id' -> ObjectId; ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: DELETE
* @route: marks form for deletion
* */
Router.delete('/:form_id/:user/:user_type',
    function (req, res, next) {
        let { form_id, user_id, user_type } = req.params;
        formsModel  
            .deleteForm({
                id: form_id,
                account_id: user_id,
                account: user_type
            },
            function (error, result) {
                if (!_.isNil(error)) {
                    res.status(500);
                    res.json({error});
                }

                res.json(result);
            });
    });

module.exports = Router;