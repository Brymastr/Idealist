var gulp = require('gulp');
var exec = require('child_process').exec;
var plugins = require('gulp-load-plugins')();

var runCommand = function(command) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
};

gulp.task('mongo-start', function() {
  runCommand("mongod");
});

gulp.task('run-server', ['mongo-start'], function() {
  plugins.nodemon({
    script: 'server.js',
    ext: 'js html',
    env: {'NODE_ENV' : 'development'}
  })
});

gulp.task('dev', [
  'mongo-start',
  'run-server'
]);