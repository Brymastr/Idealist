/**
 * Created by Brycen on 2015-06-10.
 */

var config = require('../config/config');

var LocalStrategy = require('passport-local').Strategy;
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

var User = require('.' + config.modelsDir + '/User');

module.exports = function(passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(re, username, password, done) {
    process.nextTick(function() {
      User.findOne({'local.username': username}, function(err, user) {
        if(err)
          return done(err);

        if(user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {
          var newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if(err)
              throw err;
            return done(null, newUser);
          })
        }
      })
    })
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {
    User.findOne({'local.username': username}, function(err, user) {
      if(err)
        return done(err);
      if(!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      if(!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Wrong password.'));
      return done(null, user);
    });

  }));

  // Passport authentication configuration
  //passport.use('provider', new OAuth2Strategy({
  //  authorizationURL: authConfig.oauth2Auth.authorizationURL,
  //  tokenURL: authConfig.oauth2Auth.tokenURL,
  //  clientId: authConfig.oauth2Auth.clientId,
  //  clientSecret: authConfig.oauth2Auth.clientSecret,
  //  callbackURL: authConfig.oauth2Auth.callbackURL
  //}));
};

