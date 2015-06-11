/**
 * Created by Brycen on 2015-06-10.
 */

// Express routes

var Project = require('./models/Project');

module.exports = function(app) {
  app.route('/projects')
    .get()
    .post();


  //app.get('*', function(req, res) {
  //  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  //});
};