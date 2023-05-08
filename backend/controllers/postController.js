const Post = require("../models/Post");

//gets posts only for specific date

const getPosts = async (req, res) => {
  try {
    const { date } = req.params; // Gets the date parameter from the URL
    const startDate = new Date(date);
    startDate.setHours(24, 0, 0, 0); // Sets hours, minutes, seconds, and milliseconds to 0
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // end date is a day later than start

    // gets all posts >= startDate and < endDate for current user 
    // then responds in descending order
    const posts = await Post.find({
      user: req.user._id,
      createdAt: { $gte: startDate, $lt: endDate },
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createPost = async (req, res) => {
  try {
    // Get the post from request body
    const content = req.body.content;

    if (!content) {
      return res.status(400).json({ error: "Post is empty" });
    }

    // Create a post with it
    const post = await Post.create({
      content,
      user: req.user._id,
    });

    // Respond with the new post
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updatePost = async (req, res) => {
  try {
    // get id and post content
    const postId = req.params.id;
    const content = req.body.content;

    // find and updates the post
    await Post.findOneAndUpdate(
      { _id: postId, user: req.user._id },
      {
        content, 
      }
    );
    // server does not automaticallly return updated post
    // so to get the updated post, this finds it again 
    const post = await Post.findById(postId);
    // respond with the note
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    // get id of the url
    const postId = req.params.id;

    // Deletes the the post
    await Post.deleteOne({ _id: postId, user: req.user._id });
    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};

// search still needs some work

const search = async (req, res) => {
  try {
    // gets keyword from search query
    const { keyword } = req.query;

    // checks to make sure keyword is a valid string
    // also checks to make sure the string is longer 2 characters long
    if (!keyword || typeof keyword !== "string" || keyword.trim().length < 2) {
      return res.status(400).json({ error: "Invalid search keyword" });
    }

    // gets the keyword, not case sensitive
    const searchResults = await Post.find({
      content: { $regex: keyword, $options: "i" },
      user: req.user._id,
    });
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  search,
};
