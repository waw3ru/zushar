/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const users = mongoose.model('users');
const _ = require('lodash');
const Log = require('./../lib/logger');

function addUser(user, done) {
    let newUser = new users(user);
    newUser.password = users.setPassword(data.password);
    newUser.save(function (error, data) {
        if (!_.isNil(error)) {
            Log.error(error);
            return done(error, null);
        }
        return done(null, data);
    });
}
function loginUser(data, done) {
    accounts
        .findOne({
            email: data.email,
            phone: data.phone
        })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            if (!query.validatePassword(data.password)) {
                let date = new Date();
                let err = new Error(`${date.toDateString()}:: password is incorrect`);
                Log.error(err);
                return done(err, null);
            }
            if (query.disabled) {
                let date = new Date();
                let err = new Error(`${date.toDateString()}:: Account id ${query._id} is disabled`);
                Log.warn(`${date.toDateString()}:: Account id ${query._id} is disabled`);
                return done(err, null);
            }
            return done(null, query);
        });
}
function getUserBySearch(search, done) {
    let { email, phone } = req.body;
    let searchQuery = {}
    if (!_.isNil(email)) {
        searchQuery.email = email;
    }
    if (!_.isNil(phone)) {
        searchQuery.phone = phone;
    }
    if (_.isEmpty(searchQuery)) {
        let date = new Date();
        let err = new Error(`${date.toDateString()}::[user-module]:-`);
        Log.warn(`${date.toDateString()}:: search query empty`);
        return (err, null);
    }
    else {
        userModel
            .findOne(searchQuery)
            .exec(function (error, query) {
                if (!_.isNil(error)) {
                    Log.error(error);
                    return done(error, null);
                }
                return done(null, query);
            })
    }
}
function getUsers() {

}
function updateUser() {

}
function disableUser() {

}

module.exports = {
    addUser,
    loginUser,
    getUserBySearch,
    getUsers,
    updateUser,
    disableUser
}
