/**
 * Created by Brycen on 2015-06-10.
 */

var mongoose = require('mongoose');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var config = require('./config/config');


// Create app using express router
var app = express();

// App configuration
app.use(morgan(config.env));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(session({secret: config.secret}));
app.use(cookieParser(config.secret));
app.use(flash());


// MongoDB connection
mongoose.connect(config.db);

mongoose.connection.on('open', function() {
  console.log('Mongo connection is open. Connected to: ' + config.db);
});

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

// Express routing
var routes = require('./app/routes')(passport);

app.use('/api', routes);

http.createServer(app).listen(config.port, function() {
  console.log("server listening on port " + config.port);
});