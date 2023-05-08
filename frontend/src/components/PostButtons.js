import Button from "react-bootstrap/Button";
import EditIcon from "./../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

// Edit and Delete buttons

function PostButtons({ post, editPost, deletePost }) {
  return (
    <div className="post-buttons">
      <Button
        title="edit"
        variant="dark"
        className="button"
        onClick={() => editPost(post)}
      >
        <EditIcon />
      </Button>

      <Button
        title="delete"
        variant="dark"
        className="button"
        onClick={() => deletePost(post._id)}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
}

export default PostButtons;
