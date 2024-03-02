const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');  

// Render the blogEdit page
exports.renderBlogEditPage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Render the blogEdit page and pass the blog data to the template
    res.render('blogEdit', { blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* Update Blog Entry */
module.exports.editBlog = async function(req, res) {
  try {
    const blogId = req.params.id;

    // Check if the provided ID is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'Invalid Object ID' });
    }

    // Find and update the blog entry by ID using async/await
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId },
      {
        $set: {
          title: req.body.blogTitle,
          text: req.body.blogText,
          // Add other fields as needed
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Redirect to the blogList page after successful update
    res.redirect('/blogList');
  } catch (error) {
    console.error('Error updating blog:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
     
// Controller for the Blog List page
exports.blogList = async function (req, res) {
  try {
    const blogEntries = await Blog.find();
    res.render('blogList', { title: 'Blog List', blogEntries });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller for the Blog Add page
exports.blogAdd = (req, res) => {
  res.render('blogAdd', { title: 'Add Blog' });
};

// Render the blogDelete page
exports.renderBlogDeletePage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Render the blogDelete page and pass the blog data to the template
    res.render('blogDelete', { blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a blog entry
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

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