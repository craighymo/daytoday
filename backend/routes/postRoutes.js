const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    search
} = require('../controllers/postController');

router.get("/posts/:date", auth, getPosts);
router.post("/posts", auth, createPost);
router.put("/posts/:id", auth, updatePost);
router.delete("/posts/:id", auth, deletePost);
router.get("/search", auth, search)


module.exports = router;