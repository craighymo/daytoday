import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Logo from "../components/Logo";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      setRedirect(true);
      console.log("Logged in");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  // Redirects to home if login is successful

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-page">
      <Container id="login-container" className="d-grid h-100">
        <Form
          id="login-form"
          className="rounded text-center w-100"
          onSubmit={handleLogin}
        >
          <div className="head">
            <h3>
              <Logo />
            </h3>
            <p>the nonsocial network</p>
          </div>
          <Form.Group>
            <Form.Control
              type="username"
              placeholder="username"
              className="mb-2 mt-2 "
              onChange={(event) => setUsername(event.target.value)}
              autoFocus
            ></Form.Control>
            <Form.Control
              type="password"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
              className="mb-2"
            ></Form.Control>
          </Form.Group>
          <div className="d-grid">
            <Button variant="dark" className="outline-dark mb-2" type="submit">
              login
            </Button>
          </div>
          <div>
            Not already a member?{" "}
            <Link to="/register">Create an account. </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
