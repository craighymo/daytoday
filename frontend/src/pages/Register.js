import Form from "react-bootstrap/Form";
import "./Register.css";
import Container from "react-bootstrap/Container";
import Logo from "../components/Logo"
import Button from "react-bootstrap/Button";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Registration() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createUser = async (event) => {
    event.preventDefault();
    // to make sure the user enters their password correctly it compares the two inputs
    if (password !== passwordConfirm) {
      alert("Good Job! Your passwords don't match.");
      return;
    }
    try {
      await axios.post("/register", {
        email,
        username,
        password,
      });
      setRedirect(true);
      console.log("Registration successful");
    } catch (error) {
      console.error(error);

      // gets error from backend and alerts the user
      alert(error.response.data.error); 
    }
  };

  // if registration is successful, redirects to login page

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="register-page">
      <Container id="register-container" className="d-grid h-100">
        <Form
          onSubmit={createUser}
          id="login-form"
          className="rounded text-center w-100"
        >
          <div className="head">
            <h3>
              <Logo />
            </h3>
            <p>create a new account</p>
          </div>
          <Form.Group>
            <Form.Control
              className="mb-2"
              type="email"
              placeholder="e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoFocus
            ></Form.Control>

            <Form.Control
              className="mb-2"
              type="text"
              placeholder="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            ></Form.Control>

            <Form.Control
              className="mb-2"
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>

            <Form.Control
              type="password"
              placeholder="re-enter password"
              className="mb-2"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="d-grid">
            <Button type="submit" variant="dark" className="outline-dark">
              sign up
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Registration;
