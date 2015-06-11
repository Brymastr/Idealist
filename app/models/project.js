/**
 * Created by Brycen on 2015-06-10.
 */

// Project model

var mongoose = require('mongoose');
var User = require('./User');

module.exports = mongoose.model('Project', {
  name: String,
  short_description: String,
  long_description: String,
  images: [{
    uri: String,
    title: String
  }],
  author: User,
  date_created: Date,
  date_updated: Date
});