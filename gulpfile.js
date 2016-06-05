var gulp = require('gulp'),

    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),

    concat = require('gulp-concat'),
    rename = require('gulp-rename'),

    autoprefix = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),

    browserSync = require('browser-sync'),

    runSequence = require('run-sequence'),

    del = require('del');



gulp.task('jshint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(callback) {
    // 这里可以引入其他js库
    gulp.src(['./js/common.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }));

    callback();
});

gulp.task('less', function(callback) {
    // 其余的样式文件都由style.less引入
    gulp.src(['./css/style.less'])
        .pipe(less())
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
        }))
        .pipe(rename('all.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rename('all.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));

    callback();
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    })
});

gulp.task('watch', function() {
    gulp.watch('./js/*.js', function() {
        runSequence('jshint', 'scripts');
    });

    gulp.watch('./css/*.less', ['less']);

    gulp.watch('./*.html', browserSync.reload);
});

gulp.task('clean', function(callback) {
    del(['dist/css/', 'dist/js/']);
    callback();
});

gulp.task('build', ['clean'], function(callback) {
    runSequence(['less', 'scripts']);
});

gulp.task('default', function(callback) {
    runSequence('jshint', ['less', 'scripts', 'browserSync', 'watch'], callback);
});
