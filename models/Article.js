const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
  // `title` must be of type String
  // `title` must be unique, the default mongoose error message is thrown if a duplicate value is given
  title: {
    type: String,
    unique: true
  },
  summary: String,
  link: String,
  // `posts` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Post model
  // This allows us to populate the Article with any associated posts
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
