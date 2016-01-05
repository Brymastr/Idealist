var config = require('../../config/config');
// Project model

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
var User = require('./User');
var Comment = require('./Comment').schema;

var projectSchema = Schema({
  title: String,                  // project name
  owner: {                        // owner of the project
    type: ObjectId,
    ref: 'User'
  },
  contributors: [{                // list of users that have been granted contributor permission
    type: ObjectId,
    ref: 'User'
  }],
  summary: String,                // brief summary
  description: String,            // longer description
  images: [String],               // list of image attachments
  urls: [String],                 // list of links
  tags: [String],                 // list of tags
  ownerFeasibility: Number,       // rank out of 10
  ownerUpvote: Number,            // count of upvotes by owner
  ownerDownvote: Number,          // count of downvotes by owner
  publicFeasibility: Number,      // rank out of 10
  upvoted: [{                     // list of users who have upvoted the project
    type: ObjectId,
    ref: 'User'
  }],
  downvoted: [{                   // list of users who have downvoted the project
    type: ObjectId,
    ref: 'User'
  }],
  pointsEstimate: Number,         // broad time estimate for project completion
  source: String,                 // where the idea came from
  comments: [Comment],            // list of public comments
  visibility: Number,             // 0:private, 1:protected(team), 2:public
  date_created: Date,             // date the project was created in app
  date_updated: Date              // date if updated
});

module.exports = mongoose.model('Project', projectSchema);