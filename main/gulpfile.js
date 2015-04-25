var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');

gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
    gulp.src('./less/*.less')
        .pipe(less({
            compress: true
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('min-styles', ['less'], function() {
    gulp.src('./css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
    gulp.run('lint', 'scripts', 'less', 'min-styles');

    // 监听文件变化
    gulp.watch('./js/*.js', function() {
        gulp.run('lint', 'scripts');
    });
    gulp.watch('./less/*.less', function() {
        gulp.run('less');
    })
    gulp.watch('./css/*.css', function() {
        gulp.run('min-styles');
    })
});
