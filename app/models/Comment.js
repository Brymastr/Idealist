var config = require('../../config/config');

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var commentSchema = Schema({
  body: String,
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  date_created: Date,
  date_updated: Date
});

module.exports = mongoose.model('Comment', commentSchema);