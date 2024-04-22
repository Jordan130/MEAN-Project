const mongoose = require('mongoose');
const Blog = mongoose.model('Blog'); 

// Controller methods

// Get all blogs
// api/blogs
exports.getAllBlogs = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await Blog.find();
    
    // Sort the blogs based on the number of likes in descending order
    blogs.sort((a, b) => b.likes - a.likes);

    // Send the sorted list of blogs to the client
    res.json(blogs);
  } catch (error) {
    // Handle errors
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

// Inside your controllers/blog.js file
module.exports.likeBlog = async function(req, res) {
  try {
      const blogId = req.params.id;
      // Find the blog post by ID and update its likes count
      const blog = await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } }, { new: true });
      if (!blog) {
          return res.status(404).json({ message: 'Blog not found' });
      }
      // Return the updated likes count
      res.status(200).json({ likes: blog.likes });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
