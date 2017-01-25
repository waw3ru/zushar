/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const accountsModel = mongoose.model('user-accounts');
const _ = require('lodash');
const Log = require('./../lib/logger');

function createAccount(params, done) {
    let { email, gender, phone, name, password } = params
    let newAccount = new accountsModel({ email, gender, phone, name });
    newAccount.password = accountsModel.setPassword(password);

    newAccount.save(function (error, query) {
        if (!_.isNil(error)) {
            Log.error(error);
            return done(error, null);
        }
        return done(null, { _id: query._id, token: query.generateJWT() });
    });
}

function getAccount(id, done) {
    accountsModel
        .findOneById(id)
        .select({ password: 0, verification_code: 0, validated: 0})
        .exec(function (error, query) {
             if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            return done(null, query);
        });
}

function loginAccount(params, done) {
    let { email, phone } = params;
    accountsModel
        .findOne({ email, phone })
        .select({ 'password': 0, 'validation_code': 0, 'validated': 0 })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            if (_.isNil(query) || _.isEmpty(query)) {
                let date = new Date();
                let error = new Error(`${date}:: account not found`);
                Log.error(error);
                return done(error, null);
            }
            if (!query.validatePassword(params.password)) {
                let date = new Date();
                let error = new Error(`${date.toDateString()}:: password is incorrect`);
                Log.error(error);
                return done(error, null);
            }
            if (query.deletion) {
                let date = new Date();
                let error = new Error(`${date.toDateString()}:: user-account is deleted`);
                Log.warn(error);
                return (error, null);
            }
            return done(null, { _id: query._id, token: query.generateJWT() })
        });
}

function updateAccount(params, updates, done) {
    /*
    * @desc:
    *   update user details on the database
    * */
    let { email, phone, password } = params;
    loginAccount(
        { email, phone, password }, 
        function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }

            /*
            * @desc:
            *   perform updates if no error in authenticating the account
            * */
            accountsModel.update({
                _id,
                email,
                phone
            },
            { $set: updates },
            {  
                safe: true,
                multi: false,
                runValidators: true
            },
            function (err, raw) {
                if (!_.isNil(err)) {
                    Log.error(err);
                    return done(err, null);
                }

                if (raw.ok===1 && raw.nModified===1) {
                    return done(null, {
                        updated: true,
                        timestamp: new Date()
                    });
                }
                else {
                    return done(null, {
                        updated: false,
                        timestamp: new Date()
                    });
                }

            });
        });
}

module.exports = {
    createAccount,
    loginAccount,
    getAccount,
    updateAccount
};
