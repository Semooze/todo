'use strict';

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  livereload = require('gulp-livereload');

gulp.task('default', function() {
  livereload.listen();
});

gulp.task('reload', function() {
  livereload.reload();
});

gulp.task('compress', function() {
  return gulp.src('./ui/js/*.js')
    .pipe(uglify().on('error', function(e) {
      console.log('Error message:', e.message, 'Line number:', e.lineNumber);
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./ui/dist/js/'));
});

var watcher = gulp.watch('./ui/js/*.js', ['compress', 'reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type);
});

gulp.task('sass', function () {
  return gulp.src('./ui/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./ui/css'));
});

gulp.watch('./ui/css/*.css', ['reload']);

gulp.watch('./ui/sass/*.scss', ['sass']).on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type);
});
