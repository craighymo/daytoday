import TextEditor from "./TextEditor";
import { Form, Button, Container } from "react-bootstrap/";

// React-quill text box with submit button

function CreatePostForm({ createPost, createInput, handleCreate }) {
  return (
    <Container>
      <div className="main-tbox">
        <Form onSubmit={createPost}>
          <TextEditor value={createInput.content} onChange={handleCreate} />
          <div className="submit-button">
            <Button variant="dark" type="submit">
              submit
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
export default CreatePostForm;
