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
            values: 'draft,completed,ready'.split(','),
            message: 'status not recongnized'
        },
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'missing author of the form'],
        ref: 'user-accounts'
    },
    questions: { type: Array },
    responses: { type: Array },
    contributors: { type: Array },
    creation_date: {
        type: Date,
        default: new Date()
    },
    modification_date: {
        type: Date
    }
});

schema.set('strict', false);
module.exports = schema;