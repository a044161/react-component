'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles-reload', ['styles'], function() {
  return buildStyles()
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  return buildStyles();
});

var buildStyles = function() {
 return $.rubySass(
        [
            path.join(conf.paths.src, '/**/*.scss'),
            path.join('!' + conf.paths.src, '/**/_*.scss')
        ],
        {stopOnError: true}
    )
        .on('error', conf.errorHandler('Sass'))
        .pipe($.autoprefixer())
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')));
};