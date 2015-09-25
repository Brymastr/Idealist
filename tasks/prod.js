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
    .pipe(gulp.dest('dist/config/'));
});

gulp.task('server', ['clean'], function() {
  return gulp.src('server.js')
    .pipe(plugins.uglify({mangle: false}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('dependencies', ['clean'], function() {
  return gulp.src([
    './node_modules/**',
    '!./node_modules/gulp-*'
  ])
    .pipe(gulp.dest('dist/libs/'));
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build-prod', ['clean', 'build', 'server', 'config', 'dependencies']);