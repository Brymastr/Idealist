var gulp = require('gulp');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');

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
//});
//gulp.task('mongo-start', function() {
//  runCommand("mongod");
//});

gulp.task('run-server', function() {
  nodemon({
    script: 'server.js'
    , ext: 'js html'
    , evn: {'NODE_ENV' : 'development'}
  })
});

gulp.task('dev', ['run-server']);