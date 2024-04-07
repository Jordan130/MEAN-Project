var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  // Using promises instead of callbacks
  user.save()
    .then(function(user) {
      var token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
    })
    .catch(function(err) {
      sendJSONresponse(res, 404, err);
    });
};

module.exports.login = function(req, res) {
  if (!req.body.email || !req.body.password) {      
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  User.findOne({ email: req.body.email })
    .then(function(user) {
      if (!user || !user.validPassword(req.body.password)) {
        throw new Error('Invalid email or password');
      }
      // If authentication succeeds, generate JWT token and send response
      var token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
    })
    .catch(function(err) {
      // Handle authentication errors
      sendJSONresponse(res, 401, {
        "message": "Authentication failed: " + err.message // Include the error message in the response
      });
    });
};