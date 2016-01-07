var config = require('../../config/config');
// Project model

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
var User = require('./User');

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
  owner_feasibility: Number,      // rank out of 10
  owner_upvotes: Number,           // count of upvotes by owner
  owner_downvotes: Number,         // count of downvotes by owner
  public_feasibility: Number,     // rank out of 10
  upvoted: [{                     // list of users who have upvoted the project
    type: ObjectId,
    ref: 'User'
  }],
  downvoted: [{                   // list of users who have downvoted the project
    type: ObjectId,
    ref: 'User'
  }],
  points_estimate: Number,        // broad time estimate for project completion
  source: String,                 // where the idea came from
  visibility: Number,             // 0:private, 1:protected(team), 2:public
  date_created: Date,             // date the project was created in app
  date_updated: Date              // date if updated
});

module.exports = mongoose.model('Project', projectSchema);