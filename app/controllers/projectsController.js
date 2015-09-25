/**
 * Created by Brycen on 2015-06-10.
 */
var config = require('../../config/config');

var Project = require('../models/Project');

// GET /api/
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

// GET /api/:id
exports.getProject = function(req, res) {
  Project.findOne({_id: req.params.id}, function(err, project) {
    console.log(project);
    if(project == null)
      res.sendStatus(204);
    else if(!err)
      res.json(project);
    else
      res.send(err.message);
  });
};

// POST /api/
exports.postProject = function(req, res) {
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

// PUT /api/
exports.putProject = function(req, res) {
  Project.findByIdAndUpdate(req.body._id, req.body, function(err, project) {
    if(err)
      res.send(err);
    res.json(project);
  });
};

// DELETE /api/:id
exports.deleteProject = function(req, res) {

  Project.findOneAndRemove({_id: req.params.id}, function (err, project) {
    if (!err && res != null) {
      console.log(res);
      res.status(200).json({status:"ok"})
    } else
      res.send(err.message);
  });
};