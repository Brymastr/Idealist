// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
var bcrypt = require('bcrypt');

// Define our client schema
var clientSchema = Schema({
  secret: { type: String, required: true },
  user_id: { type: String, required: true }
});

clientSchema.methods.generateHash = function(secret) {
  return bcrypt.hashSync(secret, bcrypt.genSaltSync(8), null);
};

clientSchema.methods.verifySecret = function(secret, done) {
  bcrypt.compare(secret, this.secret, function(err, isMatch) {
    if (err) return done(err);
    done(null, isMatch);
  });
};

// Export the Mongoose model
module.exports = mongoose.model('Client', clientSchema);