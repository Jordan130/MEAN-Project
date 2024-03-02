var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blog');

router.post('/blogs', blogController.createBlog); 
router.get('/blogs', blogController.getAllBlogs); 
router.get('/blogs/:id', blogController.getBlogById); 
router.put('/blogs/:id', blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog); 

module.exports = router;