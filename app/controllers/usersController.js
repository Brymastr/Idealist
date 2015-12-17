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
      res.json(user);
    }
  });
};