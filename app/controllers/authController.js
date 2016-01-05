var config = require('../../config/config');
var Project = require('../models/Project');
var User = require('../models/User');

// passport
var passport = require('passport');

exports.localLogin = function(req, res) {
  return passport.authenticate('local-login', {
    successFlash: 'Welcome!',
    failureFlash: 'Incorrect username or password.'
  })
};

exports.localSignup = function(req, res) {
  return passport.authenticate('local-signup', {
    failureFlash: true,
    successFlash: 'Success!'
  })
};

exports.isAuthenticated = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.send(401);
};

exports.localLogout = function(req, res) {
  req.logOut();
  res.send(200);
};

exports.hasAccess = function(req, res, next) {
  Project.findById(req.params.id, function(err, project) {
    if(err) {
      res.send(err.message);
      return false;
    }
    if(!project) {
      res.send(204);
      return false;
    }

    if(project.owner.equals(req.user._id)) {
      return next();
    } else if(project.contributors.indexOf(req.user._id) != -1) {
      return next();
    } else {
      res.send(403);
      return false;
    }
  });
};

exports.isOwner = function(req, res, next) {
  Project.findById(req.params.id, function(err, project) {
    if (err) {
      res.send(err.message);
      return false;
    }
    if (!project) {
      res.send(204);
      return false;
    }
    if(project.owner.equals(req.user._id)) {
      return next();
    } else {
      res.send(403);
      return false;
    }
  });
};