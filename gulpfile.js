var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var lessPluginAutoPrefix = require('less-plugin-autoprefix');

var autoprefix = new lessPluginAutoPrefix({browsers: [
    "ie >= 8",
    "ie_mob >= 10",
    "ff >= 26",
    "chrome >= 30",
    "safari >= 6",
    "opera >= 23",
    "ios >= 5",
    "android >= 2.3",
    "bb >= 10"
]});


gulp.task('lint', function() {
    gulp.src('./js/*.js').pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    gulp.src('./js/*.js').pipe(concat('all.js')).pipe(gulp.dest('./dist')).pipe(rename('all.min.js')).pipe(uglify()).pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
    gulp.src('./less/*.less').pipe(less({
        compress: false,
        plugins: [autoprefix]
    })).pipe(gulp.dest('./css'));
    gulp.src('./less/fullPage.less').pipe(less({
        compress: false,
        plugins: [autoprefix]
    })).pipe(gulp.dest('./lib')).pipe(rename('fullPage.min.css')).pipe(minifycss()).pipe(gulp.dest('./lib'));
});

gulp.task('min-styles', ['less'], function() {
    gulp.src('./css/*.css').pipe(concat('all.css')).pipe(gulp.dest('./dist')).pipe(rename('all.min.css')).pipe(minifycss()).pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
    gulp.run('lint', 'scripts', 'less', 'min-styles');
    gulp.watch('./js/*.js', function() {
        gulp.run('lint', 'scripts');
    });
    gulp.watch('./less/*.less', function() {
        gulp.run('less', 'min-styles');
    });
})
