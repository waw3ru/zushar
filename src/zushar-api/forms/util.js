/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const formsModel = mongoose.model('forms');
const _ = require('lodash');

function addContributors(params, done) {
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

function removeContribution(params, done) {
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

            let result = {};
            query.response.map((value, index) => {
                result[_.findIndex(query.questions, [''])]
            })
        })
}