// Controller for the Blog List page
exports.blogList = (req, res) => {
  res.render('blogList', { title: 'Blog List', message: 'Under Construction' });
};

// Controller for the Blog Add page
exports.blogAdd = (req, res) => {
  res.render('blogAdd', { title: 'Add Blog', message: 'Under Construction' });
};
