var config = require('../../config/config');
var Comment = require('../models/Comment');

// Add a comment
exports.createComment = function(req, res) {
  new Comment({
    body: req.body.body,
    owner: req.user,
    project_id: req.body.project_id,
    date_created: new Date(),
    date_updated: new Date()
  })
    .save(function(err, result) {
      if(err) {
        console.log(err.message);
        res.send(err.message);
        return false;
      }
      res.json(result);
    });
};

exports.deleteComment = function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err, comment) {
    if(err) res.send(err.message);

    res.send(200);
  });
};

exports.getCommentsForUser = function(req, res) {
  Comment.find({owner: req.user._id}, function(err, comments) {
    if(err) {
      res.send(err.message);
    } else {
      res.json(comments);
    }
  });
};

exports.getCommentsForProject = function(req, res) {
  Comment.find({project_id: req.params.id}, function(err, comments) {
    if(err) {
      res.send(err.message);
    } else {
      res.json(comments);
    }
  });
};


exports.getComment = function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if(err) {
      res.send(err.message);
    } else {
      res.json(comment);
    }
  });
};

exports.getComments = function(req, res) {
  Comment.find({}, function(err, comments) {
    if(err) {
      res.send(err.message);
    } else {
      res.json(comments);
    }
  });
};