/**
 * Created by Brycen on 2015-06-10.
 */

var Project = require('../models/Project');

exports.getProjects = function(req, res) {
  // Get all projects from the database
  Project.find({}, function(err, projects) {
    if(err == null) {
      res.json(projects);
    } else {
      res.send(err.message);
    }
  })
};

exports.getProject = function(req, res) {
  res.send("getProject()");
  console.log("getProject()");
  // Get a specific project from the database
};

exports.postProject = function(req, res) {
  // Create a new project in the database
  new Project({
    name: req.body.name,
    short_description: req.body.short_description,
    long_description: req.body.long_description,
    date_created: new Date(),
    date_updated: new Date()
  })
    .save(function(err, result) {
      res.json(result);
      console.log("Project created");
    });
};

exports.deleteProject = function(req, res) {

  Project.remove({_id: req.params.id}, function (err) {
    if (!err)
      res.send("Project deleted");
    else
      res.send(err.message);
  });
};