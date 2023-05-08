const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');


router.get("/todos", auth, getTodos);
router.post("/todos", auth, addTodo);
router.put("/todos/:id",  auth, updateTodo);
router.delete("/todos/:id",  auth, deleteTodo);

module.exports = router;