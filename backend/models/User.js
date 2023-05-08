const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
    
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
