const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },

    // favorite: { type: Boolean, default: false},

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
