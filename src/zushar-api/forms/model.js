/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const formsModel = mongoose.model('forms');
const _ = require('lodash');
const Log = require('./../lib/logger');

/*
* @docs:
*   expose the model methods
* */
module.exports = {
    createForm,
    getForms,
    getForm,
    updateForm,
    deleteForm,
    addContributor,
    getContributors,
    removeContributor
};

/************ Forms management model functionality implementation ************/

function createForm(params, done) {
    /*
    * @docs:
    *   creates a new form obejct in the database
    * */
    let newForm = new formsModel(params);
    newForm.contributors = [];
    newForm.save(function (error, query) {
        if (!_.isNil(error)) {
            Log.error(error);
            return done(error, null);
        }
        return done(null, query);
    });
}

function getForms(params, done) {
    /*
    * @docs:
    *   gets a list of forms from the database using the author or contributors as the query 
    *   criteria.
    *   populates the author and contributors with data from the user-accounts table
    * */
    let contributorQuery = {
        $in: [params.account_id]
    }
    
    formsModel
        .find({
            [params.account]: (params.account==='author') ?  params.account_id : contributorsQuery
        })
        .populate({
            path: 'author',
            select: '_id name gender dob'
        })
        .populate({
            path: 'contributors',
            select: '_id name gender dob'
        })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }

            return done(null, query);
        });
}

function getForm(id, done) {
    /*
    * @docs:
    *   get a single form from database based on the form ObjectId
    *   populates the author and contributors with data from user-accounts table
    * */
    formsModel
        .findById(id)
        .populate({
            path: 'author',
            select: '_id name gender'
        })
        .populate({
            path: 'contributors',
            select: '_id name gender'
        })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            return done(null, query);
        })
}

function updateForm(params, updates, done) {
    /*
    * @docs:
    *   updates a form to the database.
    *   method first does a find query with author or contributors as the criteria
    *   and then updates the query instance and saves it
    * */
    let contributorQuery = {
        $in: [params.account_id]
    };

    formsModel.findOne({
        _id: params.id,
        [params.account]: (params.account==='author') ?  params.account_id : contributorsQuery
    })
    .exec(function (error, query) {
        if (!_.isNil(error)) {
            Log.error(error);
            return done(error, null);
        }

        Object
            .keys(updates)
            .forEach(function (elem) {
                query[elem] = updates[elem];
            });
        
        query.modification_date = new Date();
        query.save(function (error, results) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }
            return done(null, results);
        });
        
    });
}

function deleteForm(params, done) {
    /*
    * @docs:
    *   marks a form for deletion 
    * */
    formsModel
        .update({
            _id: params.id,
            author: params.author
        },
        {
            $set: {
                deletion: true,
                modification_date: new Date()
            }
        }, 
        {
            safe: true,                
            multi: false,
            runValidators: true
        },
        function (error, raw) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
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
}

function addContributor(params, done) {
    /*
    * @docs:
    *   method adds contributor to the list of contributors in the database
    *   only the author of the form can add contributors.
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

            if (_.isEmpty(query)) {
                let date = new Date();
                let error = `[${date}] could not access form. check your permissions`;
                Log.error(new Error(error));
                return done(error, null); 
            }

            let newContributors = (query.contributors || []).concat(params.contributor);
            if (query.contributors.length > 0) {
                newContributors = [].concat(_.uniq((query.contributors || []), newContributors));
            }
            query.contributors = newContributors;
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
    * @docs:
    *   Create a contributors query object with a conditional to ensure the query fits
    *   for both author or contributors.
    *   This method gets a list of all the contributors and returns an array of all the 
    *   contributors in the database for a specific form (record)
    * */
    formsModel
        .findOne({
            _id: params.id,
            [params.account]: (params.account==='author') ?  params.account_id : { $in: [params.account_id] }
        })
        .exec(function (error, query) {
            if (!_.isNil(error)) {
                Log.error(error);
                return done(error, null);
            }

            if (_.isEmpty(query)) {
                let date = new Date();
                let error = `[${date}] could not access form. check your permissions`;
                Log.error(new Error(error));
                return done(error, null); 
            } 
            
            return done(null, query.contributors);
        });
}

function removeContributor(params, done) {
    /*
    * @docs:
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
            
            query.contributors.remove(params.contributor);
            query.save(function (error, results) {
                if (!_.isNil(error)) {
                    Log.error(error);
                    return done(error, null);
                }
                return done(null, results.contributors);
            });

        });
}