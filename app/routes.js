/**
 * Created by Brycen on 2015-06-10.
 */

// Express routes

var Project = require('./models/Project');

module.exports = function(app) {
  app.route('/api/projects')
    .get(function(req, res) {
      res.send('WORKING!!!');
    })
    .post();


  // Anything else should go to angular routes
  app.get('*', function(req, res) {
    res.send('Invalid api route. Route received > ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  });
};