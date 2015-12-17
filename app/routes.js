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

  // Project routes
  router.route('/projects')
    .get(AuthController.hasAccess, ProjectsController.getProjects)
    .post(ProjectsController.createProject)
    .put(ProjectsController.updateProject);

  router.route('/authtest')
    .get(AuthController.isAuthenticated, function(req, res) {
      res.send('Logged in');
    });

  router.route('/projects/:id')
    .get(ProjectsController.getProject)
    .patch(ProjectsController.patchUpdateProject)
    .delete(ProjectsController.deleteProject);

  // User routes
  router.route('/users')
    .post(AuthController.localSignup(passport));

  router.route('/login')
    .post(AuthController.localLogin(passport), function(req, res) {res.send(req.user)});

  router.route('/logout')
    .post(AuthController.localLogout);

  router.route('/users')
    .get(UsersController.getUsers);

  router.route('/users/:id')
    .get(UsersController.getUser);


  // Anything else should go to angular routes
  router.get('*', function(req, res) {
    res.send('Invalid api route or Angular route. Route received > ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  });

  return router;
};