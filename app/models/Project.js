/**
 * Created by Brycen on 2015-06-10.
 */
var config = require('../../config/config');
// Project model

var mongoose = require('mongoose');
var User = require('./User');

var projectSchema = mongoose.Schema({
  title: String,                  // project name
  summary: String,                // brief summary
  description: String,            // longer description
  images: [String],               // list of image attachments
  urls: [String],                 // list of links
  tags: [String],                 // list of tags
  ownerFeasibility: Number,       // rank out of 10
  ownerUpvote: Number,            // count of upvotes by owner
  ownerDownvote: Number,          // count of downvotes by owner
  publicFeasibility: Number,      // rank out of 10
  publicUpvotes: Number,          // count of public upvotes
  publicDownvotes: Number,        // count of public downvotes
  pointsEstimate: Number,         // broad time estimate for project completion
  source: String,                 // where the idea came from
  comments: [{commentId: Number}],// list of comment objects referenced by commentId
  visibility: Number,             // 0:private, 1:protected(team), 2:public
  date_created: Date,             // date the project was created in app
  date_updated: Date              // date if updated
});

module.exports = mongoose.model('Project', projectSchema);