/*
* This file is part of
*  _ __  _   _ _ __   ___
* | '_ \| | | | '_ \ / _ \
* | |_) | |_| | |_) |  __/
* | .__/ \__, | .__/ \___|
* |_|    |___/|_|
*                 Personal Yii Page Engine
*
*	Copyright (c) 2016 Jacob Moen
*	Licensed under the MIT license
*/

// fix problems with undefined Promise class
// http://stackoverflow.com/questions/32490328/gulp-autoprefixer-throwing-referenceerror-promise-is-not-defined
require('es6-promise').polyfill();

// Load plugins
var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
browsersync = require('browser-sync'),
sourcemaps = require('gulp-sourcemaps'),
del = require('del'),
gulpif = require('gulp-if'),
runSequence = require('run-sequence');

var theme = 'default';

var PATHS = {
    sass: [
        'vendor/bower/octicons/octicons/',
        'vendor/bower/primer-css/scss/',
        'vendor/bower/font-awesome/scss/'
    ],
    javascript: [
        'vendor/bower/jquery/dist/jquery.js',
        'themes/primer/js/jquery.sticky.js',
        'themes/primer/js/custom.js'
    ]
};

//    includePaths: PATHS.sass
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


// Styles
gulp.task('styles', function() {
    return gulp.src('themes/primer/scss/all.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.', { sourceRoot: '../../themes/primer/scss/' }))
    .pipe(gulp.dest('web/themes/primer/css'))
    .pipe(gulpif('*.css', rename({ suffix: '.min' })))
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulpif('*.css', gulp.dest('web/themes/primer/css')))
    .pipe(gulpif('*.css', notify({ message: 'Styles task complete' })));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(PATHS.javascript)
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.', { sourceRoot: '../../js/' }))
    .pipe(gulp.dest('web/themes/primer/js'))
    .pipe(gulpif('*.js', rename({ suffix: '.min' })))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.js', gulp.dest('web/themes/primer/js')))
    .pipe(gulpif('*.js', notify({ message: 'Scripts task complete' })));
});

// Images
gulp.task('images', function() {
    return gulp.src('img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('web/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Copy fonts
gulp.task('fonts', function() {
    return gulp.src([
        'vendor/bower/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('./web/themes/primer/fonts'));
});

// Clean
gulp.task('clean', function() {
    return del(['web/themes/primer/css/*', 'web/themes/primer/js/*', 'web/themes/primer/fonts/*']);
});

// Build the "web" folder by running all of the above tasks
gulp.task('build', function(callback) {
    runSequence('clean', ['styles', 'scripts', 'fonts'], callback);
});

// Watch
gulp.task('watch', function() {

    // Initialize Browsersync
    browsersync.init({
        proxy: "https://pype.dev"
    });

    // Watch .scss files
    gulp.watch('themes/primer/scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('themes/primer/js/**/*.js', ['scripts']);

    // Watch image files
    //gulp.watch('img/**/*', ['images']);

    // Watch any view files in 'views', reload on change
    gulp.watch(['themes/primer/views/**/*.jade']).on('change', browsersync.reload);
    gulp.watch(['themes/primer/views/**/*.php']).on('change', browsersync.reload);

    // Watch any files in 'web', reload on change
    gulp.watch(['web/themes/primer/js/*']).on('change', browsersync.reload);
    gulp.watch(['web/themes/primer/css/*']).on('change', browsersync.reload);
});

gulp.task('default', ['build', 'watch'], function() {});
