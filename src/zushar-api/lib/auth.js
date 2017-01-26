/*
* created by waweru
* */

'use strict';

const expressJWT = require('express-jwt');
const _ = require('lodash');
const moment = require('moment');
const getAccount = require('../user-accounts/model').getAccount

module.exports.jwtMiddleware = expressJWT({
  secret : process.env.JWT_SECRET,
  userProperty : 'zushar_auth'
});

module.exports.loggedInUser = function (req, res, next) {
    if (_.isEmpty(req.zushar_auth) || _.isNil(req.zushar_auth.id)) {
        req.zushar_auth.isLoggedin = false;
        return next();
    }
    else {
        /*
        * @desc:
        *   from user-accounts model
        * */
        getAccount(req.zushar_auth.id, function (error, result) {
            if (!_.isNil(error)) {
                req.zushar_auth.isLoggedin = false;
                res.status(500);
                res.json(error);
            }
            else {
                let age = null;
                req.zushar_auth.isLoggedin = true;
                if (!_.isEmpty(result.dob)) {
                    let dob = moment(result.dob);
                    let now = moment();
                    age = now.diff(dob, 'years', true);
                }
                req.zushar_auth.user_data = {
                    email: result.email,
                    gender: result.gender,
                    phone: result.phone,
                    name: result.name,
                    age: (age)
                };
                return next();
            }
        })
    }
}