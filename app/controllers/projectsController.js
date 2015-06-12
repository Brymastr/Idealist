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

exports.postProjects = function(req, res) {
  // Create a new project in the database
  new Project({
    name: req.body.name,
    short_description: req.body.short_description,
    long_description: req.body.long_description,
    date_created: new Date(),
    date_updated: new Date()
  })
    .save(function(err, result) {
      res.send("Project created");
      console.log("Project created");
    });
};