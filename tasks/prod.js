var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

gulp.task('build', ['clean'], function() {
  return gulp.src('./app/**/*.js')
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/app/'));
});

gulp.task('config-staging', ['clean'], function() {
  return gulp.src(['./config/config.staging.js'])
    .pipe(plugins.uglify({mangle: false}))
    .pipe(plugins.rename('config.js'))
    .pipe(gulp.dest('dist/config/'));
});

gulp.task('config-production', ['clean'], function() {
  return gulp.src(['./config/config.production.js'])
    .pipe(plugins.uglify({mangle: false}))
    .pipe(plugins.rename('config.js'))
    .pipe(gulp.dest('dist/config/'));
});

gulp.task('auth', ['clean'], function() {
  return gulp.src([
    './config/passport.js',
    './config/auth.js'
  ])
    .pipe(plugins.uglify({mangle: false}))
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

gulp.task('build-prod', [
  'clean',
  'build',
  'server',
  'config-production',
  'auth',
  'dependencies'
]);