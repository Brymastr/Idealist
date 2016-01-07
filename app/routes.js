// config
var config = require('../config/config');

// express
var express = require('express');

// Load controllers
var ProjectsController = require('./controllers/projectsController');
var AuthController = require('./controllers/authController');
var UsersController = require('./controllers/usersController');
var CommentsController = require('./controllers/commentsController');

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

  router.route('/comments')
    .get(CommentsController.getComments);// todo: remove once done

  router.route('/comments/:id')
    .get(AuthController.isAuthenticated, AuthController.hasAccess, CommentsController.getComment)
    .delete(AuthController.isAuthenticated, CommentsController.deleteComment)
    .post(AuthController.isAuthenticated, AuthController.hasAccess, CommentsController.createComment); // :id in this one means the project id. The other two mean the comment id

  router.route('/projectComments/:id')
    .get(AuthController.isAuthenticated, AuthController.hasAccess, CommentsController.getCommentsForProject);

  router.route('/userComments/:id')
    .get(AuthController.isAuthenticated, CommentsController.getCommentsForUser);


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