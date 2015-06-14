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


  app.route('/api/projects')
    .get(ProjectsController.getProjects)
    .post(ProjectsController.postProject);

  app.route('/api/projects/:id')
    .get(ProjectsController.getProject)
    .delete(ProjectsController.deleteProject);

  // Anything else should go to angular routes
  app.get('*', function(req, res) {
    res.send('Invalid api route. Route received > ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  });
};