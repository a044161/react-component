var gulp = require('gulp')
    // gutil = require("gulp-util"),
    // uglify = require('gulp-uglify');
    // imagemin = require('gulp-imagemin')
    // del = require('del'),
    // minifyHtml = require('gulp-minify-html'),
    // useref = require('gulp-useref'),
    // gulpif = require('gulp-if'),
    // rev = require('gulp-rev'),
    // revReplace = require('gulp-rev-replace'),
    // rename = require('gulp-rename')
    // gulpCopy = require('gulp-copy'),
    // connect = require('gulp-connect');


// html
// gulp.task('html', function(){
//     gulp.src('./src/**/*.html')
//         .pipe(gulp.dest('./dist/'));
// });

// // css
// var sass = require('gulp-sass'),
//     autoprefixer = require('gulp-autoprefixer'),
//     minifycss = require('gulp-minify-css');

// gulp.task('sass', function(){
//     gulp.src('./src/**/*.scss')
//         .pipe(sass({ style: 'compact' }))
//         .pipe(autoprefixer())
//         .pipe(gulp.dest('./src/'));
// });
// gulp.task('sass:watch', function(){
//     gulp.watch('./src/**/*.scss', ['sass'])
// });
// gulp.task('sass:build', function(){
//     gulp.src('./src/**/*.scss')
//         .pipe(sass({ style: 'compact' }))
//         .pipe(autoprefixer())
//         // .pipe(rename({suffix: '.min'}))
//         .pipe(minifycss())
//         .pipe(gulp.dest('./dist/'));
// });

var webpack = require("webpack"),
    // webpackStream = require("webpack-stream"),
    WebpackDevServer = require("webpack-dev-server"),
    webpackConfig = require('./webpack.config')
    // webpackConfigBuild = require('./webpack.config.build')

// gulp.task('webpack', function(callback){
//     webpack(webpackConfig, function(err, stats) {
//         // if(err) throw new gutil.PluginError("webpack", err);
//         // gutil.log("[webpack]", stats.toString({
//             // output options
//         // }));
//         callback();
//     })
// });

// gulp.task("webpack:build", function(callback) {
//     // modify some webpack config options
//     var myConfig = webpackConfigBuild;

//     // run webpack
//     myConfig.plugins = myConfig.plugins.concat(
//         new webpack.optimize.UglifyJsPlugin()
//     );
//     webpack(myConfig, function(err, stats) {
//         // if(err) throw new gutil.PluginError("webpack:build", err);
//         // gutil.log("[webpack:build]", stats.toString({
//         //     colors: true
//         // }));
//         // callback();
//     });
// });

gulp.task("webpack-dev-server", function(callback) {
    var webpack = require("webpack");
    // modify some webpack config options
    var myConfig = webpackConfig;
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        hot: true,
        publicPath: 'http://127.0.0.1:7777/app' + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(7777, "127.0.0.1", function(err) {
        // if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // gutil.log("[webpack-dev-server]", "http://localhost:7777/webpack-dev-server/index.html");
    });
});


// help
gulp.task('help', function(){
    console.log('build')
});

gulp.task('cssbuild', ["sass:build"]);

gulp.task("server", ["webpack-dev-server"]);

// 打包构建
// gulp.task("build", ["html", "webpack:build", "sass:build"]);