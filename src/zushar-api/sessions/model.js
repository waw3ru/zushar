/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const session = mongoose.model('sessions');
const Log = require('../lib/logger');

function createSession(params, done) {
    /*
    * @desc:
    *   registers session on the database
    * */
    new session({
        value: session.setValue(JSON.stringify(params.data)),
        ip_addr: params.ip
    })
    .save(function (error, query) {
        if (!_.isNil(error)) {
            Log.error(error);
            return done(error, null);
        }
        return done(null, {
            values: (JSON.parse(query.getValue()) || null),
            account: (query.account || null),
            platform: (query.platform || null),
            token: (query.token || null)
        });
    });
}

function readSession(params, done) {
    /*
    * @desc:
    *   read saved session data on the database using token and sid as params for the query.
    * */
    let { id, token, platform, account } = params;

    session
        .findOne({ 
            id, token, platform, account  
        })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            return done(null, {
                values: (JSON.parse(query.getValue()) || null),
                account: (query.account || null),
                platform: (query.platform || null),
                token: (query.token || null)
            });
        });
}

function deleteSession(params, done) {
    /*
    * @desc:
    *   delete session record from the database depending on the token sid and platform which the session was registered on.
    * */
    let { id, token, platform, account } = params;

    session
        .findOneAndRemove({ 
            id, token, platform, account 
        },
        function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            return done(null, {
                values: (JSON.parse(query.getValue()) || null),
                account: (query.account || null),
                platform: (query.platform || null),
                token: (query.token || null)
            });
        });
}

module.exports = {
    createSession,
    readSession,
    deleteSession
};