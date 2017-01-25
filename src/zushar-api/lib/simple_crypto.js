/*
* created by waweru
* */

'use strict';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc-hmac-sha256';

function simpleEncryption(password,text) {
    /*
    * @desc:
    *   does simple encryption for the Strings (text)
    * */
    let cipher = crypto.createCipher(algorithm,password)
    let crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function simpleDecryption(passwordtext){
    /*
    * @desc:
    *   does simple decryption for the Strings (text)
    * */
    let decipher = crypto.createDecipher(algorithm,password)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports = {
    simpleEncryption,
    simpleDecryption
};