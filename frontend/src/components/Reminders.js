import { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  CloseButton,
} from "react-bootstrap";
import "../App.css";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

// todolist displays only incomplete todos. Displays time since the reminder was posted.
// when checked todo becomes complete
// delete "X" removes todo completely

function TodoList() {
  const [todos, setTodos] = useState([]);

  const [todoInput, setTodoInput] = useState({ content: "" });

  // only gets todos that have not been completed
  useEffect(() => {
    getTodos({ completed: false });
  }, []);

  // gets array of todos and sets list of todos
  const getTodos = async () => {
    try {
      const response = await axios.get("/todos", {
        withCredentials: true,
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (event) => {
    try {
      event.preventDefault();

      // sends the todo in request body and gets back the new todo
      const response = await axios.post("/todos", todoInput, {
        withCredentials: true,
      });

      // adds new todo to the todos list
      setTodos([...todos, response.data.todo]);

      // sets todo input to be empty
      setTodoInput({ content: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // handles the changes in the todo text field
  const handleInput = (event) => {
    const { value } = event.target;
    setTodoInput({ ...todoInput, content: value });
  };

  const completeTodo = async (id) => {
    try {
      await axios.put(
        "/todos/" + id,
        { completed: true },
        { withCredentials: true }
      );
      // Updates the list with the completed todos filtered out
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete("/todos/" + id, {
        withCredentials: true,
      });
      getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <ListGroup className="todo-list">
        {todos &&
          todos
            .filter((todo) => !todo.completed)
            .map((todo) => (
              <ListGroup.Item key={todo._id}>
                <div className="todo-item">
                  <span className="todo-left">
                    <Form.Check
                      type="checkbox"
                      className="custom-checkbox"
                      onChange={() => completeTodo(todo._id)}
                    />
                    <span>
                      {todo.content}
                      <time className="todo-time">
                        {" (" +
                          formatDistanceToNow(new Date(todo.createdAt)) +
                          " ago )"}
                      </time>
                    </span>
                  </span>
                  <CloseButton onClick={() => deleteTodo(todo._id)} />
                </div>
              </ListGroup.Item>
            ))}
      </ListGroup>
      <div className="todo-form">
        <Form className="d-flex" onSubmit={addTodo}>
          <Form.Group className="flex-grow-1 mr-2">
            <Form.Control
              className="todo-input"
              type="text"
              placeholder="quick reminder"
              onChange={handleInput}
              value={todoInput.content}
              name="content"
              autoComplete="off"
              autoFocus
            />
          </Form.Group>
          <Button
            classame="todo-submit"
            variant="dark"
            type="submit"
            style={{ marginLeft: "5px" }}
          >
            submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default TodoList;
