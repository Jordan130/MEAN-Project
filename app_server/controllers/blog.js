const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

// Controller for the Blog List page
exports.blogList = async function (req, res) {
  try {
    const blogEntries = await Blog.find();
    res.render('blogList', { title: 'Blog List', blogEntries });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller for the Blog Edit page
exports.blogEdit = async function (req, res) {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    res.render('blogEdit', { title: 'Edit Blog', blog });
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

// Render the blog edit page
exports.renderEditPage = function(req, res, responseBody){
  res.render('blog-edit', {
      title: 'Blog Edit',
      pageHeader: {
          title: 'Blog Edit'
      },
      blog: responseBody
  });
};

exports.blogEditPost = function(req, res){
  var requestOptions, path, postdata;
  var id = req.params.id;
  path = '/app_api/blogs/' + id;

  postdata = {
      blogTitle: req.body.blogTitle,
      blogAuthor: req.body.blogAuthor,
      
  };

  requestOptions = {
      url : apiOptions.server + path,
      method : "PUT",
      json : postdata
  };

  request(
      requestOptions,
      function(err, response, body) {
          if (response.statusCode === 201) {
              res.redirect('/blogList');  
          } else {
              _showError(req, res, response.statusCode);
          }
      }
  );
};