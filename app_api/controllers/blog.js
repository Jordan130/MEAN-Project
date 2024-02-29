const mongoose = require('mongoose');
const Blog = mongoose.model('Blog'); 

// Controller methods

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const blog = await Blog.create(req.body);
    console.log('Blog created:', blog);

    // Redirect to the blogList page
    res.redirect('/blogList');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run model validation on update
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Redirect to the blogList page after updating
    res.redirect('/blogList');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    // Check if the provided ID is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'Invalid Object ID' });
    }

    // Find and delete the blog entry by ID
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Redirect to the blogList page after successful deletion
    res.redirect('/blogList');
  } catch (error) {
    console.error('Error deleting blog:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.renderEditBlogForm = async (req, res) => {
  try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

      if (!isValidObjectId) {
          console.log('Invalid Object ID:', req.params.id);
          return res.status(400).json({ message: 'Invalid Object ID' });
      }

      console.log('Requested ID:', req.params.id);
      const blogData = await Blog.findById(req.params.id);

      if (!blogData) {
          console.log('Blog not found');
          return res.status(404).json({ message: 'Blog not found' });
      }

      res.render('blogEdit', { blog: blogData });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

      if (!isValidObjectId) {
          console.log('Invalid Object ID:', req.params.id);
          return res.status(400).json({ message: 'Invalid Object ID' });
      }

      console.log('Requested ID for Update:', req.params.id);

      res.redirect('/blogs'); // Redirect to the blog list page after update
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Blog Edit
module.exports.blogEdit = function(req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.id; 
  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  }; 
  request(
      requestOptions,
      function(err, response, body) {
          renderEditPage(req, res, body);
      }
  );
};



// Blog Edit Post
exports.blogEditPost = async function(req, res){
  try {
      const blogId = req.params.id;

      // Check if the provided ID is a valid ObjectId
      const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);

      if (!isValidObjectId) {
          return res.status(400).json({ message: 'Invalid Object ID' });
      }

      // Find and update the blog entry by ID
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
          blogTitle: req.body.blogTitle,
          blogAuthor: req.body.blogAuthor,
         
      }, { new: true });

      if (!updatedBlog) {
          return res.status(404).json({ message: 'Blog not found' });
      }

      // Redirect to the blogList page after successful update
      res.redirect('/blogList');
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};