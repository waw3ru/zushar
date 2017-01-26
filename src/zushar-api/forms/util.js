/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const formsModel = mongoose.model('forms');
const _ = require('lodash');

/*
* @desc:
*   expose all the utility model methods
* */
module.exports = {
    addContributor,
    getContributors,
    removeContributor,
    addRespondant,
    getRespondants,
    removeRespondant,
    submitResponses,
    getResponses
};

function addContributor(params, done) {
    /*
    * @desc:
    *   method adds contributor to the list of contributors in the database
    *   only the author of the form can add contributors.
    * */
    formsModel
        .findOne({
            _id: params.id,
            author: params.author
        })
        exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            
            query.contributors = (query.contributors || []).concat(params.contributor);
            query.save(function (error, results) {
                if (!_.isNil(error)) {
                    Log.error(error);
                    return done(error, null);
                }
                return done(null, results.contributors);
            });

        });
}

function getContributors(params, done) {
    /*
    * @desc:
    *   Create a contributors query object with a conditional to ensure the query fits
    *   for both author or contributors.
    *   This method gets a list of all the contributors and returns an array of all the 
    *   contributors in the database for a specific form (record)
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
            return done(null, query.contributors);
        });
}

function removeContributor(params, done) {
    /*
    * @desc:
    *   Removes a contributor from the list of contributors in the form record.
    *   The method uses Array.filter() to remove the correct contributors.
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
            
            query.contributors = (query.contributors || []).filter(id=>(id!==params.contributor));
            query.save(function (error, results) {
                if (!_.isNil(error)) {
                    Log.error(error);
                    return done(error, null);
                }
                return done(null, results.contributors);
            });

        });
}

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
        exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            
            query.respondants = (query.respondants || []).concat(params.respondant);
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
            
            query.respondants = (query.respondants || []).filter(datum=>(datum.id!==params.respondant));
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