// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/User');
var Client = require('../models/Client');
var Token = require('../models/Token');

passport.use(new BasicStrategy(
  function(email, password, callback) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return callback(err); }

      if (!user) { return callback(null, false); }

      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        if (!isMatch) { return callback(null, false); }

        return callback(null, user);
      });
    });
  }
));

passport.use('client-basic', new BasicStrategy(
  function(clientId, clientSecret, callback) {
    Client.findOne({ _id: clientId }, function (err, client) {
      if (err) { return callback(err); }

      if (!client) { return callback(null, false); }

      client.verifySecret(clientSecret, function(err, isMatch) {
        if (err) { return callback(err); }

        if (!isMatch) { return callback(null, false); }

        return callback(null, client);
      });
    });
  }
));

passport.use(new BearerStrategy(
  function(accessToken, callback) {
    console.log(accessToken);
    Token.findOne({value: accessToken }, function (err, token) {
      if (err) { return callback(err); }

      // No token found
      if (!token) { return callback(null, false); }

      User.findOne({ _id: token.user_id }, function (err, user) {
        if (err) { return callback(err); }

        // No user found
        if (!user) { return callback(null, false); }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });