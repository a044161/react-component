/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'uglify-save-license', 'del', 'imagemin-pngquant']
});

gulp.task('images-build', function(){
    return gulp.src([
        path.join(conf.paths.src, '/**/*.{png,jpg,gif,ico}')
    ])
        .pipe($.imagemin({
            optimizationLevel:5,
            progressive:true,
            svgoPlugins:[{removeViewBox: false}],
            use: [$.imageminPngquant()]
        }))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('html-build', function () {
    return gulp.src([
        path.join(conf.paths.tmp, '/serve/**/*.html'),
        path.join('!' + conf.paths.tmp, '/**/_*.html')
    ])
        .pipe($.useref())
        .pipe($.if('*.css', $.minifyCss({ processImport: false })))
        .pipe($.if('*.js', $.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify')))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        //.pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));

});

gulp.task('other-build', function () {
    var fileFilter = $.filter(function (file) {
       return file.stat.isFile();
    });

    return gulp.src([
        path.join(conf.paths.src, '/**/*'), 
        path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss,png,jpg,gif,ico}')
    ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
    return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html-build', 'images-build', 'other-build']);