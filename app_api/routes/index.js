var express = require('express');
var router = express.Router();
var jwt = require('express-jwt'); // Lab 6
var auth = jwt({   // Lab 6
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var blogController = require('../controllers/blog');
var authController = require('../controllers/authentication');  // Lab 6

// Blog Routes
router.post('/blogs', blogController.createBlog); // Lab 6 - added auth param
router.get('/blogs', blogController.getAllBlogs); 
router.get('/blogs/:id', blogController.getBlogById); 
router.put('/blogs/:id', blogController.updateBlog); // Lab 6 - added auth param
router.delete('/blogs/:id', blogController.deleteBlog); // Lab 6 - added auth param
router.post('/blogs/:id/like', blogController.likeBlog); // Add this route for liking a blog post

// Authentication Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;