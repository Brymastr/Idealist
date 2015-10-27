'use strict';
var mongoose = require("mongoose");
var Project = require("../app/models/Project");
var config = require("../config/config");

exports.up = function(next) {

  mongoose.connect(config.db, function() {
    p1.save();
    p2.save();
    next();
  });


};

exports.down = function(next) {
  mongoose.connect(config.db, function() {
    next();
  });
};

var p1 = new Project({
  title: "Project 1",
  summary: "Summary or Project 1",
  description: "Long description of Project 1",
  tags: ["a", "b", "c"],
  source: "This idea manifested at school",
  visibility: 0,
  date_created: new Date(2015, 4, 2),
  date_updated: new Date(2015, 10, 26)
});

var p2 = new Project({
  title: "Project 2",
  summary: "Summary or Project 2",
  description: "Long description of Project 2",
  tags: ["f", "a", "d"],
  source: "This idea manifested at work",
  visibility: 1,
  date_created: new Date(2014, 2, 18),
  date_updated: new Date(2015, 1, 3)
});