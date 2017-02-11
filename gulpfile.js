/*
* Created on 23/12/2016 by John Waweru
* */

'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');

const testServer = () => {
    /*
    * @desc: Runs the testing server for zushar build
    * @params: null
    * @return: null
    * */

    connect.server({
       name: 'TestServer',
       debug: true,
       port: process.env.PORT || 5000,
       livereload: false,
       fallback: 'index.html'
    });
};

/*
* @task: run test server
* @method: testServer 
* */
gulp.task('test:server', testServer);
