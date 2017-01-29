/*
* created by waweru
* */

'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    let stream = nodemon({
        script: './view/bin.js',
        ext: 'js json',
        env: {
        'NODE_ENV': 'development'
        },
        ignore: [
            'node_modules/',
            'logs/',
            '*.md',
            'src/zushar-docs/',
            'src/zushar-main/',         
        ],
        watch: 'src/zushar-api'
    });

    stream
        .on('start', () => {
            gutil.log(gutil.colors.underline.bold.green('Nodemon started server'));
        })
        .on('crash', () => {
            gutil.log(gutil.colors.underline.bgRed('Server Crashed'));
            stream.emit('quit');
            process.exit(0);
        })
        .on('restart', () => {
            gutil.log(gutil.colors.underline.blue('nodemon restarting server'));
        })
        .on('quit', () => {
            gutil.log(gutil.colors.underline.bold('nodemon has exited!'));
        });
});

gulp.task('stop:server', () => {
  process.kill(process.pid, 'SIGUSR2');
});