var bcrypt = require('bcryptjs');
var db = require('../config/db');
var noteSchema = require('./note-schema');
var beautifyUnique = require('mongoose-beautiful-unique-validation');

var userSchema = db.Schema({
  name: {
    type: String,
    required: [true, 'Full Name is required.']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: 'That username is already in use'
  },
  passwordDigest: {
    type: String,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  notes: [noteSchema]
});

userSchema.plugin(beautifyUnique);

userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

userSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.passwordDigest;
  delete user.__v;
  return user;
};

userSchema.methods.authenticate = function(password, callback) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.passwordDigest, (err, isMatch) => {
      if (isMatch) {
        resolve(user);
      }
      else {
        reject(err);
      }
    });
  });
};

module.exports = userSchema;
