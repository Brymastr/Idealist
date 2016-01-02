var config = require('../../config/config');
var Project = require('../models/Project');
var User = require('../models/User');

var AuthController = require('./authController');

// GET /api/projects
exports.getProjects = function(req, res) {
  Project.find({owner: req.user._id}, function(err, projects) {
    if(err) {
      res.send(err.message);
    } else {
      res.json(projects);
    }
  })
};

// GET /api/projects/:id
exports.getProject = function(req, res) {
  Project.findOne({_id: req.params.id, owner: req.user}, function(err, project) {
    if(err) {
      res.send(err.message);
    } else if(!project) {
      res.sendStatus(204);
    } else {
      res.json(project);
    }
  });
};

// POST /api/projects
exports.createProject = function(req, res) {
  new Project({
    owner: req.user,
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

// PUT /api/projects
exports.updateProject = function(req, res) {
  Project.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err, project) {
    if(err)
      res.send(err);
    res.json(project);
  });
};

// PATCH /api/projects/:id
exports.patchUpdateProject = function(req, res) {
  Project.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, project) {
    if(err) res.send(err);
    res.json(project);
  });
};

// DELETE /api/projects/:id
exports.deleteProject = function(req, res) {
  Project.findOneAndRemove({_id: req.params.id}, function (err, project) {
    if (!err && res != null) {
      res.status(200).json({status:"ok"})
    } else
      res.send(err.message);
  });
};


//** Other functions **//

// Upvote a project
exports.upvote = function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if(err) res.send(err);
    

  });
};

// Downvote a project