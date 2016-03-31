var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

gulp.task('app', ['clean'], function() {
  return gulp.src('./app/**/*.js')
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/app/'));
});

gulp.task('config', ['clean'], function() {
  return gulp.src(['./config/config.release.js'])
    .pipe(plugins.uglify({mangle: false}))
    .pipe(plugins.rename('config.js'))
    .pipe(gulp.dest('dist/config/'));
});

gulp.task('server', ['clean'], function() {
  return gulp.src('server.js')
    .pipe(plugins.uglify({mangle: false}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('dependencies', ['clean'], function() {
  return gulp.src('package.json')
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build', [
  'clean',
  'app',
  'server',
  'config',
  'dependencies'
]);