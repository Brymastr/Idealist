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

exports.hasAccess = function(req, res) {
  Project.findOne({_id: req.params.id}, function(err, project) {
    if(err) {
      res.send(err.message);
    } else if(!project) {
      res.sendStatus(204);
      return false;
    }

    if(project.owner.equals(req.user._id)) {
      return next();
    } else if(project.contributors.indexOf(req.user._id) != -1) {
      return next();
    } else {
      res.sendStatus(403);
    }
  });
};