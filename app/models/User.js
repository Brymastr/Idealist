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

// Generate a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);