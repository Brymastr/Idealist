var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
var bcrypt = require('bcrypt');

var userSchema = Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    password_change_token: String,
    date_updated: Date,
    date_created: Date,
    profile_picture: String
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);