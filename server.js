/**
 * Created by Brycen on 2015-06-10.
 */

var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./config/database');

// Create app using express router
var app = express();
var router = express.Router();

// App configuration
app.use(router);
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

// MongoDB connection
mongoose.connect(db.url);

mongoose.connection.on('open', function() {
  console.log('Mongo connection is open');
});

// Express routing
require('./app/routes')(app);