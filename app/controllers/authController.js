var config = require('../../config/config');
var Project = require('../models/Project');
var User = require('../models/User');

// passport
var passport = require('passport');

// does user have access
exports.hasAccess = function(req, res, next) {
  // get logged in user
  console.log(req);
  return next();

  // check if user is granted access

  //return result
};

exports.localLogin = function(req, res) {
  return passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: 'Incorrect username or password.'
  })
};

exports.localSignup = function(req, res) {
  return passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
    successFlash: 'Success!'
  })
};

exports.isAuthenticated = function(req, res, next) {
  if(req.user) {
    res.send('Successfuly authenticated');
    return next();
  }
  res.send('Not logged in');
};