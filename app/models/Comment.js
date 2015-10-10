/**
 * Created by Danny on 2015-10-01.
 */
var config = require('../../config/config');

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  body: String,
  owner: {
    type: Schema.Type.ObjectId,
    ref: 'User'
  },
  createDate: Date,
  updatedDate: Date,
  feasibilityRating: Number
});

module.exports = mongoose.model('Comment', commentSchema);