var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');
  livereload = require('gulp-livereload');

gulp.task('default', function() {
  livereload.listen();
});

gulp.task('reload', function() {
  livereload.reload();
});

gulp.task('compress', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

var watcher = gulp.watch('js/*.js', ['compress', 'reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type);
});
