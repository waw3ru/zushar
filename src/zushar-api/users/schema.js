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
    gender: {
        type: String,
        enum: {
            values: 'male,female'.split(','),
            message: 'Gender not available'
        },
        required: true
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
schema.methods.validatePassword = function(password) {
  let pwd = this.password.split(';');
  let hmac = crypto.createHmac('sha512WithRSAEncryption', pwd[1]);
  hmac.update(password);
  let hash_pwd = hmac.digest('hex') + ';' + pwd[1];
  return (this.password === hash_pwd);
};
schema.statics.setPassword = function(password) {
  let salt = crypto.randomBytes(24).toString('hex');
  let hmac = crypto.createHmac('sha512WithRSAEncryption', salt);
  hmac.update(password);
  return hmac.digest('hex') + ';' + salt;
};

module.exports = schema;