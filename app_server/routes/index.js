var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blog');
var homeController = require('../controllers/home'); 

/* GET home page. */
router.get('/', homeController.homePage);

/* GET blogList page. */
router.get('/blogList', blogController.blogList);

/* GET blogDelete page */
router.get('/blogDelete/:id', blogController.renderBlogDeletePage);

/* POST blogDelete page */
router.post('/blogDelete/:id', blogController.deleteBlog);

/* GET blogAdd page. */
router.get('/blogAdd', blogController.blogAdd);

/* GET blogEdit page. */
router.get('/blogEdit/:id', blogController.renderBlogEditPage);

/* POST blogEdit page. */
router.post('/blogEdit/:id', blogController.editBlog);

module.exports = router;
