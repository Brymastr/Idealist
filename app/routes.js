// config
var config = require('../config/config');


// Load models
var Project = require('./models/Project');

// Load controllers
var ProjectsController = require('./controllers/projectsController');

module.exports = function(app, passport) {

  // Project routes
  app.route('/api/projects')
    .get(ProjectsController.getProjects)
    .post(ProjectsController.postProject)
    .put(ProjectsController.putProject);

  app.route('/api/projects/:id')
    .get(ProjectsController.getProject)
    .patch(ProjectsController.patchProject)
    .delete(ProjectsController.deleteProject);

  // Auth routes
  app.route('/api/signup')
    .post(passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/register',
      failureFlash: true
    }));

  app.route('/api/login')
    .post(passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: 'login',
      failureFlash: true
    }));

  //app.route('/api/users/:id')
  //  .get(UsersController.getUser)
  //  .delete(UsersController.deleteUser);

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