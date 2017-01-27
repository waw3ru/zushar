/*
* created by waweru
* */

'use strict';

const express = require('express');
const Router = express.Router();
const _ = require('lodash');
const accountModel = require('./model');
const auth = require('../lib/auth');

/*
* @path: '/'
* @method: POST
* @route: user-account registration
* */
Router.post('/', 
    function (req, res, next) {
        if (_.isNil(req.body.email) || _.isNil(req.body.phone)) {
            let date = new Date();
            let error = new Error(`${date.toDateString()}:: some inputs are invalid please try again`);
            res.status(500);
            res.json({error});
        }
        else {
            accountModel
                .createAccount(req.body, function (error, result) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }
                    else {
                        res.json(result);
                    }
                });
        }
    });

/*
* @path: '/login'
* @method: POST
* @route: login user-account
* */
Router.post('/login', 
    function (req, res, next) {
        if (_.isNil(req.body.email) || _.isNil(req.body.phone)) {
            let date = new Date();
            let error = new Error(`${date.toDateString()}:: some inputs are invalid please try again`);
            res.status(500);
            res.json({error});
        }
        else {
            accountModel
                .loginAccount(req.body, function (error, result) {
                   if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }
                    else {
                        res.json(result);
                    }
                });
        }
    });

/*
* @path: '/'
* @method: PUT
* @route: update user-account
* */
Router.put('/', 
    auth.jwtMiddleware,
    auth.loggedInUser,
    function (req, res, next) {
        if (_.isNil(req.body.email) || _.isNil(req.body.phone)) {
            let date = new Date();
            let error = new Error(`${date.toDateString()}:: some inputs are invalid please try again`);
            res.status(500);
            res.json({error});
        }
        else if (!req.zushar_auth.isLoggedin) {
            let date = new Date();
            let error = new Error(`${date.toDateString()}:: authentication problem`);
            res.status(500);
            res.json({error});
        }
        else {
            accountModel
                .updateAccount({
                        email: req.body.email,
                        password: req.body.password,
                        phone: req.body.phone,
                        _id: req.zushar_auth.id
                    }, 
                    req.body.updates, 
                    function (error, result) {
                        if (!_.isNil(error)) {
                            res.status(500);
                            res.json({error});
                        }
                        else {
                            res.json(result);
                        }
                    });
        }
    });

/*
* @path: '/'
* @method: DELETE
* @route: mark user-account for deletion
* */
Router.delete('/',
    auth.jwtMiddleware,
    auth.loggedInUser, 
    function (req, res, next) {
        if (_.isNil(req.body.email) || _.isNil(req.body.phone)) {
            let date = new Date();
            let error = new Error(`${date.toDateString()}:: some inputs are invalid please try again`);
            res.status(500);
            res.json({error});
        }
        else {
            accountModel
                .updateAccount({
                        email: req.body.email,
                        password: req.body.password,
                        phone: req.body.phone,
                        _id: req.zushar_auth.id
                    }, 
                    {
                        deletion: true,
                        modification_date: new Date()
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
        }
    });

/*
* @path: '/',
* @method: GET
* @route: default route for testing the user-accounts endpoint
* */
Router.get('/', 
    function (req, res, next) {
        res.json({
            message: 'User accounts module',
            status: 'Good'
        });
    });

module.exports = Router;