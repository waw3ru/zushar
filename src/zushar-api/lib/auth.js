/*
* created by waweru
* */

'use strict';

const expressJWT = require('express-jwt');
const _ = require('lodash');
const getAccount = require('../user-accounts/model').getAccount

module.exports.jwtMiddleware = expressJWT({
  secret : process.env.JWT_SECRET,
  userProperty : 'zushar_auth'
});

module.exports.loggedInUser = function (req, res, next) {
    if (_.isEmpty(req.zushar_auth) || _.isNil(req.zushar_auth.id)) {
        req.zsrLoggedIn = false;
        return next();
    }
    else {
        /*
        * @desc:
        *   from user-accounts model
        * */
        getAccount(req.zushar_auth.id, function (error, result) {
            if (!_.isNil(error)) {
                req.zsrLoggedIn = false;

                res.status(500);
                res.json(error);
            }
            else {
                req.zsrLoggedIn = true;
                req.zsrAuthData = {
                    email: result.email,
                    gender: result.gender,
                    phone: result.phone,
                    name: result.name
                };
                return next();
            }
        })
    }
}