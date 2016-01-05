// config
var config = require('../config/config');

// express
var express = require('express');

// Load controllers
var ProjectsController = require('./controllers/projectsController');
var AuthController = require('./controllers/authController');
var UsersController = require('./controllers/usersController');

module.exports = function(passport) {

  var router = express.Router();

  // TODO: maybe remove when done testing
  router.route('/authtest')
    .get(AuthController.isAuthenticated, function(req, res) {
      res.send(req.user);
    });

  router.route('/accesstest/:id')
    .get(AuthController.hasAccess, function(req, res) {
      res.send('Access granted');
    });


  // Project routes
  router.route('/projects')
    .get(AuthController.isAuthenticated, ProjectsController.getProjects)
    .post(AuthController.isAuthenticated, ProjectsController.createProject)
    .put(AuthController.isAuthenticated, ProjectsController.updateProject);

  router.route('/projects/:id')
    .get(AuthController.isAuthenticated, ProjectsController.getProject)
    .patch(AuthController.isAuthenticated, ProjectsController.patchUpdateProject)
    .delete(AuthController.isAuthenticated, AuthController.isOwner, ProjectsController.deleteProject);

  router.route('/projects/upvote/:id')
    .post(AuthController.isAuthenticated, ProjectsController.publicUpvote);

  router.route('/projects/downvote/:id')
    .post(AuthController.isAuthenticated, ProjectsController.publicDownvote);

  router.route('/projects/addContributor/:id')
    .post(AuthController.isAuthenticated, AuthController.isOwner, ProjectsController.addContributor);

  router.route('/projects/removeContributor/:id')
    .post(AuthController.isAuthenticated, AuthController.isOwner, ProjectsController.removeContributor);

  router.route('/projects/addComment/:id')
    .post(AuthController.isAuthenticated, AuthController.hasAccess, ProjectsController.addComment);

  router.route('/projects/removeComment/:id')
    .post(AuthController.isAuthenticated, AuthController.hasAccess, ProjectsController.removeComment);


  // Auth routes
  router.route('/login')
    .post(AuthController.localLogin(passport), function(req, res) {res.send(req.user)});

  router.route('/logout')
    .post(AuthController.localLogout);


  // User routes
  router.route('/users')
    .get(UsersController.getUsers)// TODO: remove when happy with signup and login
    .post(AuthController.localSignup(passport), AuthController.localLogin(passport), function(req, res) {res.send(req.user)});

  router.route('/users/:id')
    .get(AuthController.isAuthenticated, UsersController.getUser);


  // Anything else should go to angular routes
  router.get('*', function(req, res) {
    // TODO: forward to angular routes
    res.send('Invalid api route or Angular route: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  });

  return router;
};