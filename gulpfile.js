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
  return gulp.src('js/*.js')
    .pipe(uglify().on('error', function(e) {
      console.log('Error message:', e.message, 'Line number:', e.lineNumber);
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

var watcher = gulp.watch('./js/*.js', ['compress', 'reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type);
});

gulp.task('sass', function () {
  return gulp.src('./sass*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.watch('./sass/*.scss', ['sass']);
