// config
var config = require('../config/config');

// express
var express = require('express');

// Load controllers
var ProjectsController = require('./controllers/projectsController');
var AuthController = require('./controllers/authController');

module.exports = function(passport) {

  var router = express.Router();

  // Project routes
  router.route('/projects')
    .get(AuthController.hasAccess, ProjectsController.getProjects)
    .post(ProjectsController.postProject)
    .put(ProjectsController.putProject);

  router.route('/authtest')
    .get(AuthController.isAuthenticated, function(req, res) {
      res.send('Logged in');
    });

  router.route('/projects/:id')
    .get(ProjectsController.getProject)
    .patch(ProjectsController.patchProject)
    .delete(ProjectsController.deleteProject);

  // User routes
  router.route('/users')
    .post(AuthController.localSignup(passport));

  router.route('/login')
    .post(AuthController.localLogin(passport), function(req, res) {res.send(req.user)});

  router.route('/logout')
    .post(AuthController.localLogout);

  //app.route('/api/users/:id')
  //  .get(UsersController.getUser)
  //  .delete(UsersController.deleteUser);


  // Anything else should go to angular routes
  router.get('*', function(req, res) {
    res.send('Invalid api route or Angular route. Route received > ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  });

  return router;
};