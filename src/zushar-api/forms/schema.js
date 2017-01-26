/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    form_state: {
        type: String,
        enum: {
            values: 'draft,complete,ready'.split(','),
            message: 'status not recongnized'
        },
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'missing author of the form'],
        ref: 'user-accounts'
    },
    questions: { type: Array, default: [] },
    responses: { type: Array, default: [] },
    respondants: { type: Array, default: [] },
    contributors: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'missing author of the form'],
        ref: 'user-accounts'
    }],
    creation_date: {
        type: Date,
        default: new Date()
    },
    modification_date: {
        type: Date
    },
    deletion: {
        type: Boolean,
        default: false
    }
});

schema.set('strict', false);
module.exports = schema;