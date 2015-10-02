/**
 * Created by Danny on 2015-10-01.
 */
var config = require('../../config/config');
// Comment model

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  body: String,
  creator: Number,
  createDate: Date,
  updatedDate: Date,
  feasibilityRating: Number
});

module.exports = mongoose.model('Comment', commentSchema);