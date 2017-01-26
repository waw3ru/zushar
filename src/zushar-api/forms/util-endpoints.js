/*
* created by waweru
* @desc:
*   these are endpoints for the utility functions for the forms module
* */

'use strict';

const express = require('express');
const Router = express.Router();
const _ = require('lodash');
const formsUtil = require('./util');
const auth = require('../lib/auth');

/***************************************************************************/
/*
* START OF CONTRIBUTORS ROUTING
* */

// contributors utility endpoints
const contributorsRouter = express.Router();
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
            formsUtil
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
            formsUtil
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
            formsUtil
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
// expose the contributors utility endpoint to the forms routing system
Router.use('/contributors', auth.jwtMiddleware, auth.loggedInUser, contributorsRouter);

/*
* END OF CONTRIBUTORS ROUTING
* */
/***************************************************************************/

/***************************************************************************/
/*
* START OF RESPONDANTS ROUTING
* */

// respondants utility endpoints
const respondantsRouter = express.Router();
/*
* @path: '/:form_id/:user_id'
* @method: POST,
* @route: adds respondants to the list of respondants
* */
respondantsRouter.post('/:form_id/:user_id/',
    function (req, res, next) {

        if (req.params.user_id !== req.zushar_auth.id) {
            let date = new Date();
            let error = `[${date.toDateString()}] could not access form. check your permissions`;
            res.status(500);
            res.json({error});
        }
        else {
            formsUtil
                .addRespondant({
                    id: req.params.form_id,
                    author: req.params.user_id,
                    respondant: req.body.respondant
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
* @route: get the list of respondants
* */
respondantsRouter.get('/:form_id/:user_id/:user_type',
    function (req, res, next) {
        let formUser = {
            account_id: req.params.user_id,
            account: req.params.user_type
        };

        if ( req.params.user_type === 'author' && (req.params.user_id !== req.zushar_auth.id) ) {
            let date = new Date();
            let error = `[${date.toDateString()}] could not access form. check your permissions`;
            res.status(500);
            res.json({error});
        }
        else {
            formsUtil
                .getRespondants({
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
* @path: '/:form_id/:user_id/:user_type'
* @method: GET,
* @route: get the list of respondants
* */
respondantsRouter.delete('/:form_id/:user_id/',
    function (req, res, next) {
        let formUser = {
            account_id: req.params.user_id,
            account: req.params.user_type
        };

        if (req.params.user_id !== req.zushar_auth.id) {
            let date = new Date();
            let error = `[${date.toDateString()}] could not access form. check your permissions`;
            res.status(500);
            res.json({error});
        }
        else {
            formsUtil
                .removeRespondant({
                    id: req.params.form_id,
                    author: req.params.user_id,
                    respondant: req.body.respondant
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
// expose the respondants utility endpoint to the forms routing system
Router.use('/respondants', auth.jwtMiddleware, auth.loggedInUser, respondantsRouter);

/*
* END OF RESPONDANTS ROUTING
* */
/***************************************************************************/

module.exports = Router;