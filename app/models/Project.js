/**
 * Created by Brycen on 2015-06-10.
 */
var config = require('../config/config');
// Project model

var mongoose = require('mongoose');
var User = require('.' + config.modelsDir + '/User');

var projectSchema = mongoose.Schema({
  name: String,
  short_description: String,
  long_description: String,
  images: [{
    uri: String,
    title: String
  }],
  //author: User,
  date_created: Date,
  date_updated: Date
});

module.exports = mongoose.model('Project', projectSchema);