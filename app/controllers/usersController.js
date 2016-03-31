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

// Return the username and profile picture for a specific user
exports.getUser = function(req, res) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if(err) {
      res.send(err.message);
    } else if(!user) {
      res.sendStatus(204);
    } else {
      res.json({
        email: user.email,
        profile_picture: user.profile_picture
      });
    }
  });
};

exports.createUser = function(req, res) {
  var newUser = new User();

  var email = req.body.email;
  var password = req.body.password;

  if(!email) {
    res.status(400).send("Missing email");
  }

  if(!password) {
    res.status(400).send("Missing password");
  }

  User.findOne({email: email}, function(err, user) {
    console.log(newUser);
    if(user) {
      res.send("Email already exists");
    } else {
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      console.log(newUser);
      newUser.save(function(err) {
        console.log("after save");
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