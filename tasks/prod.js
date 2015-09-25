var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

gulp.task('build', ['clean'], function() {
  return gulp.src('./app/**/*.js')
    .pipe(plugins.concat('app.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('config', ['clean'], function() {
  return gulp.src('./config/config.prod.js')
    .pipe(plugins.uglify({mangle: false}))
    .pipe(gulp.dest('dist/config/'))
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build-prod', ['clean', 'build', 'config']);