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

// Execute before each user.save() call
userSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

// checking if password is valid
userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);