import TextEditor from "./TextEditor";
import { Form, Button, Container } from "react-bootstrap/";

// same as create post but recieves the original text from the post to be edited and updates posts

function EditPostForm({ updatePost, updateInput, handleUpdate }) {
  return (
    <Container>
      <div className="main-tbox">
        <Form onSubmit={updatePost}>
          <TextEditor value={updateInput.content} onChange={handleUpdate} />
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
export default EditPostForm;
