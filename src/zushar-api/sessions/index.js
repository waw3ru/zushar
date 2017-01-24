/*
* created by waweru
* */

'use strict';

/*
* @desc: 
*   list of session handling middlewares for zushar api user-server session management
* */

const sessionModel = require('./model');

function registerSession(req, res, next) {
    /*
    * @desc:
    *   add the session to the database and also include the session data on the req object
    * */

    sessionModel.createSession({
        data: req.customValues.data,
        account: req.customValues.account,
        platform: req.customValues.platform
    }, 
    function (error, results) {
        if (!_.isNil(error)) {
            res.status(500);
            res.json(error);
        }
        else {
            req.session = results;
            next();
        }
    });

}

function getSession(req, res, next) {
    /*
    * @desc:
    *   read session data from the db and it to the req object
    * */

    let sessionData = req.get('X-zushar-session').split(';');
    sessionModel.readSession({
        id: sessionData[1],
        token: sessionData[0],
        account: sessionData[2],
        platform: req.get('X-zushar-platform')
    }, 
    function (error, results) {
        if (!_.isNil(error)) {
            res.status(500);
            res.json(error);
        }
        else {
            req.session = results;
            next();
        }
    });
}

function clearSession(req, res, next) {
     /*
    * @desc:
    *   remove session data from the db and nullify the req.session 
    * */

    let sessionData = req.get('X-zushar-session').split(';');
    sessionModel.deleteSession({
        id: sessionData[1],
        token: sessionData[0],
        account: sessionData[2],
        platform: req.get('X-zushar-platform')
    }, 
    function (error, results) {
        if (!_.isNil(error)) {
            res.status(500);
            res.json(error);
        }
        else {
            req.session = null;
            next();
        }
    });
}

module.exports = {
    registerSession,
    getSession,
    clearSession
};