/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const JWT = require('jsonwebtoken');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        default: crypto.randomBytes(7).toString('hex')
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
    dob: {
        type: String
    },
    creation_date: {
        type: Date,
        default: new Date()
    },
    validated: {
        type: Boolean,
        default: false
    },
    validation_code: {
        type: String,
        unique: true,
        required: true,
        default: crypto.randomBytes(4).toString('hex')
    },
    deletion: {
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
schema.methods.generateJWT = function() {
    return JWT.sign({
        id: this._id,
        creation_date: this.creation_date
    }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = schema;