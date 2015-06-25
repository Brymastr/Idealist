/**
 * Created by Brycen on 2015-06-10.
 */

var mongoose = require('mongoose');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./config/debug/database');

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

// Create app using express router
var app = express();

// App configuration
app.use(router);
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(express.session({secret: 'not much of a secret yet'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// MongoDB connection
mongoose.connect(db.url);

mongoose.connection.on('open', function() {
  console.log('Mongo connection is open');
});

// Passport authentication configuration
passport.use('provider', new OAuth2Strategy({
  authorizationURL: 'http://localhost:9000/oauth2/request_token',
  tokenURL: 'http:/localhost:9000/oauth2/access_token',
  clientId: '123-456-789',
  clientSecret: 'not much of a secret yet',
  callbackURL: 'http://localhost:9000/auth/provider/callback'
}));

// Express routing
require('./app/routes')(app);

var port = 9000;
http.createServer(app).listen(port, function() {
  console.log("server listening on port " + port);
});