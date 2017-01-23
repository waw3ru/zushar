/*
* created by waweru
* */

'use strict';

const express = require('express');
const Router = express.Router();
const userModel = require('./model');

/*
* register user
* */
Router.post('/', 
    function (req, res) {
       /*
       * @desc:
       *    registers a new user
       * */ 
      let dob = moment(req.body.dob);
      let now = moment();
      let age = now.diff(dob, 'years');

      userModel.addUser({
          name: req.body.name,
          email: req.body.email,
          age,
          phone: req.body.phone,
          password: req.body.password
      },
      function (error, user) {
          if (!_.isNil(error)) {
              res.status(500);
              res.json(error);
          }
          else {
              res.json(user);
          }
      });

    });

Router.post('/auth', 
    function (req, res) {
       /*
       * @desc:
       *    authenticates a user
       * */ 

      userModel.loginUser({
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password
      },
      function (error, user) {
          if (!_.isNil(error)) {
              res.status(500);
              res.json(error);
          }
          else {
              res.json(Object.assign({}, user, {
                  password: null,
                  validation_code: null
              }));
          }
      });

    });

Router.get('/search', 
    function (req, res) {
        /*
        * @desc:
        *    searches for a specific user detail
        * */ 
        userModel.getUserBySearch(req.body, function (error, query) {
            if (!_.isNil(error)) {
              res.status(500);
              res.json(error);
            }
            else {
                res.json(Object.assign({}, query, {
                  password: null,
                  validation_code: null
              }));
            }
        });
    });

Router.put('/', 
    function (req, res) {
        /*
        * @desc:
        *    updates user details
        * */ 
        let data = {};
        if (!_.isEmpty(req.body.updates.email)) {
            data.email = req.body.updates.email;
        }
        if (!_.isEmpty(req.body.updates.phone)) {
            data.phone = req.body.updates.phone;
        }
        if (!_.isEmpty(req.body.updates.name)) {
            data.name = req.body.updates.name;
        }
        if (!_.isEmpty(req.body.updates.dob)) {
            let dob = moment(req.body.updates.dob);
            let now = moment();
            let age = now.diff(dob, 'years');
            date.age = age;
        }
        
        userModel.updateUser(data,
            req.body.auth, 
            function (error, updates) {
                 if (!_.isNil(error)) {
                    res.status(500);
                    res.json(error);
                }
                else {
                    res.json(Object.assign({}, query, {
                        password: null,
                        validation_code: null
                    }));
                }
        });
    });

module.exports = Router;