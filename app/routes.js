/**
 * Created by Brycen on 2015-06-10.
 */

// Express routes

// Load models
var Project = require('./models/Project');

// Load controllers
var UsersController = require('./controllers/UsersController');
var ProjectsController = require('./controllers/ProjectsController');
var TeamsController = require('./controllers/TeamsController');
var AuthController = require('./controllers/AuthController');

module.exports = function(app) {

  // Project routes
  app.route('/api/projects')
    .get(ProjectsController.getProjects)
    .post(ProjectsController.postProject)
    .put(ProjectsController.putProject);

  app.route('/api/projects/:id')
    .get(ProjectsController.getProject)
    .delete(ProjectsController.deleteProject);

  // User routes
  app.route('/api/users')
    .get(UsersController.getUsers)
    .post(UsersController.postUsers)
    .put(UsersController.putUsers);

  app.route('/api/users/:id')
    .get(UsersController.getUser)
    .delete(UsersController.deleteUser);

  // Authentication routes
  app.route('/api/auth/provider')
    .get(passport.authenticate('provider'));

  app.route('/api/auth/provider/callback')
    .get(passport.authenticate('provider', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));


  // Anything else should go to angular routes
  app.get('*', function(req, res) {
    res.send('Invalid api route. Route received > ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  });
};