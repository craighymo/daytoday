const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },

    completed: { type: Boolean, default: false }, 

    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
