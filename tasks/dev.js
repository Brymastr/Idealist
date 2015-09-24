var gulp = require('gulp');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var jslint = require('gulp-jslint');

var runCommand = function(command) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
};

//gulp.task('mongo-stop', function() {
//  runCommand('mongo admin --eval "db.shutdownServer();"');
//}
//gulp.task('mongo-start', function() {
//  runCommand("mongod");
//});

gulp.task('run-server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: {'NODE_ENV' : 'development'}
  })
});

gulp.task('lint', function() {
  return gulp.src(['/app/**/*.js'])
    .pipe(jslint({
      reporter: function(event) {
        var msg = ' ' + event.file;
        if(event.pass) {
          msg = '[PASS]' + msg;
        } else {
          msg = '[FAIL]' + msg;
        }
        console.log(msg);
      }
    }))
});

gulp.task('test', function() {
  console.log('test task run');
});


gulp.task('dev', ['run-server']);