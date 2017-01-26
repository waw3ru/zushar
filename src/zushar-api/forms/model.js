/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const formsModel = mongoose.model('forms');
const _ = require('lodash');
const Log = require('./../lib/logger');

function createForm(params, done) {
    /*
    * @desc:
    *   creates a new form obejct in the database
    * */
    let newForm = new formsModel(params);
    newForm.save(function (error, query) {
        if (!_.isNil(error)) {
            Log.error(error);
            return done(error, null);
        }
        return done(null, error);
    });
}

function getForms(params, done) {
    /*
    * @desc:
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
        .sort({ creation_date: -1 })
        .populate({
            path: 'author',
            select: '_id name gender -password -verification_code -validated -creation_date'
        })
        .populate({
            path: 'contributors',
            select: '_id name gender -password -verification_code -validated -creation_date'
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
    * @desc:
    *   get a single form from database based on the form ObjectId
    *   populates the author and contributors with data from user-accounts table
    * */
    formsModel
        .findById(id)
        .populate({
            path: 'author',
            select: '_id name gender -password -verification_code -validated -creation_date'
        })
        .populate({
            path: 'contributors',
            select: '_id name gender -password -verification_code -validated -creation_date'
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
    * @desc:
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
    * @desc:
    *   marks a form for deletion 
    * */
    formsModel
        .update({
            _id: params._id,
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

module.exports = {
    createForm,
    getForms,
    getForm,
    updateForm,
    deleteForm
};