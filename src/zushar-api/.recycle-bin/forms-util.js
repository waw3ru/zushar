/*
* created by waweru
* Holds all code that were not per specs for a specific version
* Contains content from form management utility functionality
* */

'use strict';

function addRespondant(params, done) {
    /*
    * @desc:
    *   Respondants are the users responsible for answering the questions
    *   A respondant is an object: { id:<UUID:- required>, email: <STRING:- required>, name; <STRING:- optional> }
    * */
    formsModel
        .findOne({
            _id: params.id,
            author: params.author
        })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            
            let newRespondants = (query.respondants || []).concat(params.respondant);
            if (query.respondants.length > 0) {
                newRespondants = [].concat(_.uniq((query.respondants || []), newRespondants));
            }
            query.respondants = [].concat(newRespondants);
            query.save(function (error, results) {
                if (!_.isNil(error)) {
                    Log.error(error);
                    return done(error, null);
                }
                return done(null, results.respondants);
            });

        });
}

function getRespondants(params, done) {
    /*
    * @desc:
    *   Retrieves a list of all respondants but this action is limited to only contributors
    *   and authors of forms.
    * */
    let contributorQuery = {
        $in: [params.account_id]
    };

    formsModel
        .findOne({
            _id: params.id,
            [params.account]: (params.account==='author') ?  params.account_id : contributorsQuery
        })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            return done(null, query.respondants);
        });
}

function removeRespondant(params, done) {
    /*
    * @desc:
    *   Removes a respondant from the database but this action is limited to the authors of 
    *   forms
    * */
    formsModel
        .findOne({
            _id: params.id,
            author: params.author
        })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            
            query.save(function (error, results) {
                if (!_.isNil(error)) {
                    Log.error(error);
                    return done(error, null);
                }
                return done(null, results.respondants);
            });

        });
}

function submitResponses(params, done) {
    /*
    * @desc:
    *   allows submission of answers in the form per ObjectId
    *   method works by including the response or response in the responses column.
    *   then updates the table row on the database
    * */
    formsModel
        .findById(params.id)
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            query.responses = (query.responses || []).concat(params.responses);
            query.save(function (error, result) {
                if (!_.isNil(error)) {
                    Log.error(error);
                    return done(error, null);
                }
                return done(null, results.responses);
            });
        });
}

function getResponses(params, done) {
    /*
    * @desc:
    *   gets the list of responses for a specific form and creates a data structure where
    *   the index of the question in the questions<Array> is the key and the response object
    *   as the value.
    * */
    let contributorQuery = {
        $in: [params.account_id]
    };

    formsModel
        .findOne({
            _id: params.id,
            [params.account]: (params.account==='author') ?  params.account_id : contributorsQuery
        })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }

            let results = {};
            query.response.forEach((value, index) => {
                results[_.findIndex(query.questions, ['id', value.question])] = value;
            });

            return done(null, results);
        });
}