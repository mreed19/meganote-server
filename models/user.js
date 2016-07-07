var db = require('../config/db');

var userSchema = db.Schema({
  name: String,
  username: String
});

var User = db.model('User', userSchema);

module.exports = User;
