var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); // Import mongoose
var blogController = require('../controllers/blog');
var homeController = require('../controllers/home');

const Blog = require('../../app_api/models/blogs');  

/* GET home page. */
router.get('/', homeController.homePage);

/* GET blogList page. */
router.get('/blogList', blogController.blogList);

/* GET blogEdit page. */
router.get('/blogEdit/:id', blogController.blogEdit);

/* GET blogDelete page */
router.get('/blogDelete/:id', blogController.renderBlogDeletePage);

/* POST blogDelete page */
router.get('/blogDelete/:id', blogController.deleteBlog);

/* GET blogAdd page. */                        
router.get('/blogAdd', blogController.blogAdd);

module.exports = router;
