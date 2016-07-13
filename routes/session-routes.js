var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// login
router.post('/', (req, res) => {
  if (req.body.user) {
    User.findOne({
      username: req.body.user.username
    })
    .then(
      user => {
        if (user) {
          // user exists
          user.authenticate(req.body.user.password, (isMatch) => {
            if (isMatch) {
              // correct password
              var token = jwt.sign(
                { _id: user._id },
                process.env.JWT_SECRET,
                {
                  expiresIn: 60*60*24
                }
              );
              res.json({
                user,
                authToken: token
              })
            }
            else {
              // wrong password
              res.status(401).json({ message: 'We were unable to log you in with those credentials.'});
            }
          });
        }
        else {
          // user does note exist
          res.status(401).json({ message: 'We were unable to log you in with those credentials.'});
        }
      }
    );
  }
  else {
    res.status(401).json({ message: 'We were unable to log you in with those credentials.'});
  }
});

module.exports = router;
