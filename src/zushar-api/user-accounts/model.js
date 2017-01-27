/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const accountsModel = mongoose.model('user-accounts');
const _ = require('lodash');
const Log = require('./../lib/logger');

function createAccount(params, done) {
    let { email, gender, phone, name, dob, password } = params;
    /*
    * @desc:
    *   validate params<Object> for certain required { key:value }
    * */
    if (_.isNil(email) || _.isNil(password) || _.isNil(phone) || _.isNil(gender)) {
        let date = new Date();
        let error = `${date}:: some inputs missing`;
        Log.error(new Error(error));
        return done(error, null); 
    }

    /*
    * @desc:
    *   creates a Date constructor
    * */
    let formattedDob;
    if (!_.isNil(dob)) {
        formattedDob = new Date(dob);
    }

    // add user to the database
    let newAccount = new accountsModel({ email, gender, phone, name, formattedDob });
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
        .findById(id)
        .select({ 'password': 0, 'verification_code': 0, 'validated': 0 })
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
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            if (_.isNil(query) || _.isEmpty(query)) {
                let date = new Date();
                let error = `${date}:: account not found`;
                Log.error(new Error(error));
                return done(error, null);
            }
            if (!query.validatePassword(params.password)) {
                let date = new Date();
                let error = `${date.toDateString()}:: password is incorrect`;
                Log.error(new Error(error));
                return done(error, null);
            }
            if (query.deletion) {
                let date = new Date();
                let error = `${date.toDateString()}:: user-account is deleted`;
                Log.warn(new Error(error));
                return done(error, null);
            }
            return done(null, { _id: query._id, token: query.generateJWT() })
        });
}

function updateAccount(params, updates, done) {
    /*
    * @desc:
    *   update user details on the database
    * */
    let updatesCopy = Object.assign({}, updates);
    let { _id, email, phone, password } = params;

    loginAccount(
        { email, phone, password }, 
        function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }   

            /*
            * @desc:
            *   added a conditional so as to hash the new password before updating the record
            * */
            if (!_.isEmpty(updates.password)) {
                updatesCopy = Object.assign({}, updatesCopy, {
                    password: accountsModel.setPassword(updates.password)
                });
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
            { $set: updatesCopy },
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
