/*
* created by waweru
* */

'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');
const crypto = require('../lib/simple_crypto');

const schema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        default: crypto.randomBytes(24).toString('hex')
    },
    value: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: new Date()
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'missing account id'],
        ref: 'user-accounts'
    },
    platform: {
        type: String,
        enum: 'web,mobile,desktop'.slipt(','),
        required: true
    }
});

schema.static.setValue = function (value) {
    let password = uuid.v4();
    let hashValue = crypto.simpleEncryption(password,value);
    return `${hashValue};${password}`;
}
schema.methods.getValue = function () {
    let values = this.value.split(';');
    return crypto.simpleDecryption(values[1],values[0]);
}

module.exports = schema;