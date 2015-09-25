var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

gulp.task('build-app-prod', function() {
  return gulp.src('./app/**/*.js')
    .pipe(plugins.concat('app.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build-prod', ['clean', 'build-app-prod']);