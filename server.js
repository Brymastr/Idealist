/**
 * Created by Brycen on 2015-06-10.
 */

var mongoose = require('mongoose');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var methodOverride = require('method-override');
var session = require('express-session');
var config = require('./config/config');


// Create app using express router
var app = express();

// App configuration
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(session({
  secret: 'not much of a secret yet'
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(config.db);

mongoose.connection.on('open', function() {
  console.log('Mongo connection is open. Connected to: ' + config.db);
});

require('./config/debug/passport')(passport);

// Express routing
require('./app/routes')(app, passport);

var port = config.port;
http.createServer(app).listen(port, function() {
  console.log("server listening on port " + port);
});