/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        minlength: 3,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    creation_date: {
        type: Date,
        default: new Date()
    },
    modification_date: {
        type: Date
    },
    validated: {
        type: Boolean,
        default: false
    },
    validation_code: {
        type: String,
        unique: true,
        required: true,
        default: uuid.v4()
    },
    disabled: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
});

schema.set('strict');
schema.methods.validatePassword = function(code) {
  return (this.validation_code === code);
};

module.exports = schema;