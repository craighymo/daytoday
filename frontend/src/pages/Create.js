import TextEditor from "../components/TextEditor";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import NavBar from "../components/NavBar";
import "./Create.css";

// form off of home page for creating posts

// mostly modified code from the home page

function Create() {
  const [createInput, setCreateInput] = useState({
    content: "",
  });

  const [redirect, setRedirect] = useState(false);

  const handleCreate = (value) => {
    setCreateInput({ ...createInput, content: value });
  };

  const createPost = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4000/posts", createInput, {
        withCredentials: true,
      });
      setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Redirects to home page after post is sent successfully
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <NavBar />
      <Container id="create-container" className="d-grid h-100">
        <div className="create-tbox w-100">
          <Form onSubmit={createPost} autoFocus>
            <TextEditor value={createInput.content} onChange={handleCreate} />
            <div className="submit-button">
              <Button variant="dark" className="outline-dark" type="submit">
                submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Create;
