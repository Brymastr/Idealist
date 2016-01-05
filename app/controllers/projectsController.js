var config = require('../../config/config');
var Project = require('../models/Project');
var User = require('../models/User');
var mongoose = require('mongoose');

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
    upvoted: 0,
    downvoted: 0,
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
    if(err) res.send(err.message);
    res.json(project);
  });
};

// PATCH /api/projects/:id
exports.patchUpdateProject = function(req, res) {
  Project.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, project) {
    if(err) res.send(err.message);
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

// Upvote a project (public)
exports.publicUpvote = function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if(err) res.send(err.message);

    // If user had previously downvoted then remove the downvote
    var downvoteIndex = project.downvoted.indexOf(req.user._id);
    if(downvoteIndex != -1) {
      project.downvoted.splice(downvoteIndex, 1);
    }

    // Only upvote if user hasn't already upvoted
    var upvoteIndex = project.upvoted.indexOf(req.user._id);
    if(upvoteIndex != -1) {
      // Already upvoted, remove the upvote
      project.upvoted.splice(upvoteIndex, 1);
      res.send(200);
    } else {
      project.upvoted.push(req.user);
      project.save(function(err, result) {
        if(err) res.send(err.message);
        res.json(result);
      });
    }
  });
};

// Downvote a project
exports.publicDownvote = function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if(err) res.send(err.message);

    // If user had previously upvoted then remove the upvote
    var upvoteIndex = project.upvoted.indexOf(req.user._id);
    if(upvoteIndex != -1) {
      project.upvoted.splice(upvoteIndex, 1);
    }

    // Only downvote if user hasn't already downvoted
    var downvoteIndex = project.downvoted.indexOf(req.user._id);
    if(downvoteIndex != -1) {
      project.downvoted.splice(downvoteIndex, 1);
      res.send(200);
    } else {
      project.downvoted.push(req.user);
      project.save(function(err, result) {
        if(err) res.send(err.message);
        res.json(result);
      });
    }
  });
};

// Add a contributor
exports.addContributor = function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if(err) res.send(err.message);

    var contributorIndex = project.contributors.indexOf(req.body.contributor);
    if(contributorIndex != -1) {
      res.send(403);
      return false;
    } else {
      project.contributors.push(req.body.contributor);
      project.save(function(err, result) {
        res.json(result);
      });
    }
  });
};

// Add a contributor
exports.removeContributor = function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if(err) res.send(err.message);

    var contributorIndex = project.contributors.indexOf(req.body.contributor);
    if(contributorIndex == -1) {
      res.send(200)
    } else {
      project.contributors.splice(contributorIndex, 1);
      project.save(function(err, result) {
        res.json(result);
      });
    }
  });
};

