/**
 * Created by Brycen on 2015-06-10.
 */
var config = require('../../config/config');
var User = require('../models/User');

exports.getUsers = function(req, res) {
  // TODO: Limit what is returned by this or remove all together
  User.find({}, function(err, projects) {
    if(err) {
      res.send(err.message);
    } else {
      res.json(projects);
    }
  });
};

exports.getUser = function(req, res) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if(err) {
      res.send(err.message);
    } else if(!user) {
      res.sendStatus(204);
    } else {
      res.json({
        username: user.username,
        profile_picture: user.profile_picture
      });
    }
  });
};

exports.createUser = function(req, res) {
  var newUser = new User();

  var username = req.body.username;
  var password = req.body.password;

  if(!username) {
    res.status(400).send("Missing username");
  }

  if(!password) {
    res.status(400).send("Missing password");
  }

  User.findOne({username: username}, function(err, user) {
    if(user) {
      res.send("Username already exists");
    } else {
      newUser.username = username;
      newUser.password = password;
      newUser.save(function(err) {
        if (err)
          res.send(err);

        res.send(newUser);
      });
    }
  });
};


exports.deleteAllUsers = function(req, res) {
  User.remove({}, function() {});
  res.send(200);
};