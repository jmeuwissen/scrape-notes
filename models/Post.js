const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
const PostSchema = new Schema({
  // `author` must be of type String
  author: String,
  // `body` must be of type String
  body: String
});

// This creates our model from the above schema, using mongoose's model method
const Post = mongoose.model("Post", PostSchema);

// Export the Post model
module.exports = Post;
