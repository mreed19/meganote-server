require('dotenv').load();
var express = require('express');
var bodyParser = require('body-parser');
var noteRoutes = require('./routes/note-routes');
var User = require('./models/user');

var app = express();

// Middleware
app.use(function(req, res, next) {
  // Allow CORS
  res.header('Access-Control-Allow-Origin', '*');

  // Allow Content-Type header (for JSON payloads)
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // Allow more HTTP verbs
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');

  // Continue processing the request
  next();
});

// Body parsing for JSON POST/PUT payloads
app.use(bodyParser.json());

// Routes
app.use('/api/v1/notes', noteRoutes);

// CREATE a user
app.post('/users', function (req, res) {
  var user = new User({
    name: req.body.user.name,
    username: req.body.user.username
  });

  user.save().then(function(userData) {
    res.json({
      message: 'Successfully created a user.',
      user: userData
    });
  });
});

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
