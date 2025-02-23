var  mongoose = require('mongoose');
var gracefulShutdown;

require('dotenv').config(); // Load environment variables from .env
// Database connection
var dbURI = process.env.DB_URI

if (process.env.NODE_ENV === 'production') {
	    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
 console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
 console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
 console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
gracefulShutdown = function(msg, callback) {
 mongoose.connection.close(function() {
  console.log('Mongoose disconnected through ' + msg);
  callback();
 });
};

// For nodemon restarts
process.once('SIGUSR2',function(){
 gracefulShutdown('app termination', function(){
  process.exit(0);
 });
});
// For app termination
process.on('SIGINT', function(){
 gracefulShutdown('Heroku app termination', function(){
  process.exit(0);
  });
});
// For Heroku termination
process.on('SIGTERM', function(){
 gracefulShutdown('Heroku app termination', function(){
  process.exit(0);
 });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./blogs');
require('./users');
