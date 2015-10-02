/**
 * Created by Brycen on 2015-06-10.
 */
var config = require('../../config/config');
// Project model

var mongoose = require('mongoose');
var User = require('./User');

var projectSchema = mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  images: String,
  urls: [String],
  tags: [String],
  ownerFeasibility: Number,
  ownerUpvote: Number,
  ownerDownvote: Number,
  publicFeasibility: Number,
  publicUpvote: Number,
  publicDownvote: Number,
  pointsEstimate: Number,
  source: String,
  comments: [{commentId: Number}],
  visibilityLevel: Number,
  date_created: Date,
  date_updated: Date
});

module.exports = mongoose.model('Project', projectSchema);