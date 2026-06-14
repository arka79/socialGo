const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: String,

  username: String,

  text: String,

  image: String,

  likes: {
    type: [String],
    default: [],
  },

  comments: {
    type: [
      {
        username: String,
        text: String,
      },
    ],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);