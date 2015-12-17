var config = require('../../config/config');
var Project = require('../models/Project');
var User = require('../models/User');

// GET /api/
exports.getProjects = function(req, res) {
  // Get all projects from the database TODO: for current user
  Project.find({}, function(err, projects) {
    if(err) {
      res.send(err.message);
    } else {
      res.json(projects);
    }
  })
};

// GET /api/:id
exports.getProject = function(req, res) {
  Project.findOne({_id: req.params.id}, function(err, project) {
    if(err) {
      res.send(err.message);
    } else if(!project) {
      res.sendStatus(204);
    } else {
      res.json(project);
    }
  });
};

// POST /api/
exports.createProject = function(req, res) {
  new Project({
    title: req.body.title,
    summary: req.body.summary,
    description: req.body.description,
    tags: req.body.tags,
    source: req.body.source,
    visibility: req.body.visibility,

    ownerUpvotes: 0,
    ownerDownvotes: 0,
    publicUpvotes: 0,
    publicDownvotes: 0,
    date_created: new Date(),
    date_updated: new Date()
  })
    .save(function(err, result) {
      res.json(result);
      console.log("Project created");
    });
};

// PUT /api/
exports.updateProject = function(req, res) {
  Project.findByIdAndUpdate(req.body._id, req.body, function(err, project) {
    if(err)
      res.send(err);
    res.json(project);
  });
};

// PATCH /api/:id
exports.patchUpdateProject = function(req, res) {
  Project.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, function(err, project){
    if(err) res.send(err);
    res.json(project);
  });
};

// DELETE /api/:id
exports.deleteProject = function(req, res) {
  Project.findOneAndRemove({_id: req.params.id}, function (err, project) {
    if (!err && res != null) {
      //console.log(res);
      res.status(200).json({status:"ok"})
    } else
      res.send(err.message);
  });
};

exports.hasProjectPermission = function(req, res) {
  User.findByIdAndUpdate({_id: req.user}, function(err, user) {
    if(err) res.send(err);
    return user.indexOf(req.body._id > -1);
  });
};