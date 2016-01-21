'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('html-reload', ['html'], function() {
    return buildHtml()
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return buildHtml();
});

function buildHtml() {

    var injectStyles = gulp.src([
        path.join(conf.paths.tmp, '/serve/**/*.css')
    ], { read: false });

    var injectScripts = gulp.src([
        path.join(conf.paths.src, '/**/*.module.js'),
        path.join(conf.paths.src, '/**/*.js'),
        path.join('!' + conf.paths.src, '/**/*.spec.js'),
        path.join('!' + conf.paths.src, '/**/*.mock.js'),
    ], { read: false });

    var injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')]
    };


    return gulp.src([
        path.join(conf.paths.src, '/**/*.html')
    ])
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')));
};
