const mongoose = require('mongoose');

// Define the schema for a blog entry
const blogSchema = new mongoose.Schema({
 title:{
  type: String,
  required: true,
 },
 text:{
  type: String,
  required: true,
 },
 createdOn:{
  type: Date,
  default: Date.now,
 },
});

//Create the Mongoose model for the blog entry
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;