const mongoose = require('mongoose');
const Blog = mongoose.model('Blog'); 

// Controller methods

// Get all blogs
// api/blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a blog by ID
// api/blogs/<id>
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
// api/blogs
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

// Update a blog
// api/blogs/<id>
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog
// api/blogs/<id>
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findOneAndDelete({ _id: req.params.id });

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};