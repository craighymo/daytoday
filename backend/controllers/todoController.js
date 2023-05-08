const Todo = require("../models/Todo");

// finds todos for current user and responds with them
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(400).json(error);
  }
};

const addTodo = async (req, res) => {
  try {
    const content = req.body.content;

    // makes sure todo isn't empty
    if (!content) {
      return res.status(400).json({ error: "Reminder is empty" });
    }

    // creates the new todo and responds with it
    const todo = await Todo.create({
      content: content,
      user: req.user._id,
    });
    res.status(200).json({ todo });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const completed = req.body.completed;

    // sets the todo to completed
    await Todo.findOneAndUpdate(
      { _id: todoId, user: req.user._id },
      { completed }
    );

    // finds todo and responds with updated todo
    const todo = await Todo.findById(todoId);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // finds todo from id  and deletes it
    await Todo.deleteOne({ _id: todoId, user: req.user._id });

    res.status(200).json({ message: "todo deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
