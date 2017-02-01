/*
* created by waweru
* */

'use strict';


const express = require('express');
const Router = express.Router();
const _ = require('lodash');
const formsModel = require('./model');
const auth = require('../lib/auth');


/************ utility functions for form management endpoints ************/
const contributorsRouter = express.Router();
/************ End ************/


/*
* @path: '/:form_id/:user_id'
* @method: POST,
* @route: adds contributors to the list of contributors
* */
contributorsRouter.post('/:form_id/:user_id',
    function (req, res, next) {
        
        if (req.params.user_id !== req.zushar_auth.id) {
            let date = new Date();
            let error = `[${date.toDateString()}] could not access form. check your permissions`;
            res.status(500);
            res.json({error});
        }
        else {
            formsModel
                .addContributor({
                    id: req.params.form_id,
                    author: req.params.user_id,
                    contributor: req.body.contributor
                },
                function (error, results) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }
                    else {
                        res.json(results);
                    } 
                });
        }

    });

/*
* @path: '/:form_id/:user_id/:user_type'
* @method: GET,
* @route: get a list of all contributors related to a form
* */
contributorsRouter.get('/:form_id/:user_id/:user_type',
    function (req, res, next) {

        if ( req.params.user_type === 'author' && (req.params.user_id !== req.zushar_auth.id) ) {
            let date = new Date();
            let error = `[${date.toDateString()}] could not access form. check your permissions`;
            res.status(500);
            res.json({error});
        }
        else {
            formsModel
                .getContributors({
                    id: req.params.form_id,
                    account_id: req.params.user_id,
                    account: req.params.user_type
                },
                function (error, results) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }
                    else {
                        res.json(results);
                    } 
                });
        }

    });

/*
* @path: '/:form_id/:user_id'
* @method: DELETE,
* @route: remove a contributor
* */
contributorsRouter.delete('/:form_id/:user_id',
    function (req, res, next) {
        if (req.params.user_id !== req.zushar_auth.id) {
            let date = new Date();
            let error = `[${date.toDateString()}] could not access form. check your permissions`;
            res.status(500);
            res.json({error});
        }
        else {
            formsModel
                .removeContributor({
                    id: req.params.form_id,
                    author: req.params.user_id,
                    contributor: req.body.contributor
                },
                function (error, results) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }
                    else {
                        res.json(results);
                    } 
                });
        }

    });

/*
* END OF CONTRIBUTORS ROUTING
* */
/***************************************************************************/
Router.use('/contributors', auth.jwtMiddleware, auth.loggedInUser, contributorsRouter);


/*
* @path: '/',
* @method: POST
* @route: add a new form
* */
Router.post('/', 
    auth.jwtMiddleware,
    auth.loggedInUser,
    function (req, res, next) {
        if (_.isEmpty(req.body.form)) {
            let date = new Date();
            res.status(500);
            res.json({ error: `${date.toDateString()}:: some inputs are invalid please try again`});
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
    auth.jwtMiddleware,
    auth.loggedInUser,
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
                    else {
                        res.json(results);
                    }
                });
    });

/*
* @path: '/forms/:id/:account/:account_type',
* @params: ':id' -> ObjectId; ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: GET
* @route: get form object
* */
Router.get('/:form_id',
    auth.jwtMiddleware,
    auth.loggedInUser,
    function (req, res, next) {
        formsModel
            .getForm(req.params.form_id, 
                function (error, result) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }
                    else {
                        res.json(result);
                    }
                });
    });

/*
* @path: '/forms/:id/:account/:account_type',
* @params: ':id' -> ObjectId; ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: PUT
* @route: update a form
* */
Router.put('/:form_id/:user_id/:user_type',
    auth.jwtMiddleware,
    auth.loggedInUser,
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
                else {
                    res.json(results);
                }
            });
    });

/*
* @path: '/forms/:id/:account/:account_type',
* @params: ':id' -> ObjectId; ':account_type' -> [author, contributor]; ':account' -> ObjectId
* @method: DELETE
* @route: marks form for deletion
* */
Router.delete('/:form_id/:author',
    auth.jwtMiddleware,
    auth.loggedInUser,
    function (req, res, next) {
        formsModel  
            .deleteForm({
                id: req.params.form_id,
                author: req.params.author
            },
            function (error, result) {
                if (!_.isNil(error)) {
                    res.status(500);
                    res.json({error});
                }
                else {
                    res.json(result);
                }
            });
    });

/*
* @path: '/'
* @method: GET
* @route: default route for forms module
* */
Router.get('/', 
    auth.jwtMiddleware,
    auth.loggedInUser,
    function (req, res, next) {
        res.json({
            message: 'Forms module',
            status: 'Good'
        });
    });

module.exports = Router;