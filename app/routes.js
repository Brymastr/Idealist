// config
var config = require('../config/config');

// express
var express = require('express');

// controllers
var ProjectsController = require('./controllers/projectsController');
var AuthController = require('./controllers/authController');
var UsersController = require('./controllers/usersController');
var CommentsController = require('./controllers/commentsController');
var ClientsController = require('./controllers/clientsController');
var Oauth2Controller = require('./controllers/oauth2Controller');

module.exports = function() {

  var router = express.Router();

  // Project routes
  router.route('/projects')
    .get(AuthController.isBearerAuthenticated, ProjectsController.getProjects)
    .post(AuthController.isBearerAuthenticated, ProjectsController.createProject)
    .put(AuthController.isBearerAuthenticated, ProjectsController.updateProject);

  router.route('/projects/:id')
    .get(AuthController.isBearerAuthenticated, ProjectsController.getProject)
    .patch(AuthController.isBearerAuthenticated, ProjectsController.patchUpdateProject);
    // .delete(AuthController.isAuthenticated, AuthController.isOwner, ProjectsController.deleteProject);

  router.route('/projects/upvote/:id')
    .post(AuthController.isBearerAuthenticated, ProjectsController.publicUpvote);

  router.route('/projects/downvote/:id')
    .post(AuthController.isBearerAuthenticated, ProjectsController.publicDownvote);

  // router.route('/projects/addContributor/:id')
  //   .post(AuthController.isAuthenticated, AuthController.isOwner, ProjectsController.addContributor);

  // router.route('/projects/removeContributor/:id')
  //   .post(AuthController.isAuthenticated, AuthController.isOwner, ProjectsController.removeContributor);


  // Comment routes
  router.route('/comments')
    .get(CommentsController.getComments)// todo: remove once done
    .put(AuthController.isBearerAuthenticated, CommentsController.updateComment);

  router.route('/comments/:id')
    // .get(AuthController.isAuthenticated, AuthController.hasAccess, CommentsController.getComment)
    .delete(AuthController.isBearerAuthenticated, CommentsController.deleteComment)
    .patch(AuthController.isBearerAuthenticated, CommentsController.patchUpdateComment);
    // .post(AuthController.isAuthenticated, AuthController.hasAccess, CommentsController.createComment); // :id in this one means the project id. The other two mean the comment id

  // router.route('/projectComments/:id')
  //   .get(AuthController.isAuthenticated, AuthController.hasAccess, CommentsController.getCommentsForProject);

  router.route('/userComments')
    .get(AuthController.isBearerAuthenticated, CommentsController.getCommentsForUser);


  // Authentication routes
  router.route('/clients')
    .post(AuthController.isAuthenticated, ClientsController.postClients)
    .get(AuthController.isAuthenticated, ClientsController.getClients);

  router.route('/oauth2/authorize')
    .get(AuthController.isAuthenticated, Oauth2Controller.authorization);

  router.route('/oauth2/token')
    .post(AuthController.isClientAuthenticated, Oauth2Controller.token);


  // User routes
  router.route('/users')
    .get(UsersController.getUsers)// TODO: remove when happy with signup and login
    .post(UsersController.createUser)
    .delete(UsersController.deleteAllUsers); // TODO: remove after testing

  router.route('/users/:id')
    .get(AuthController.isBearerAuthenticated, UsersController.getUser);


  // Anything else should go to angular routes
  router.get('*', function(req, res) {
    // TODO: forward to angular routes
    res.send('Invalid api route or Angular route: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  });

  return router;
};