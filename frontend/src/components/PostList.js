import Container from "react-bootstrap/Container";
import DayPost from "./DayPost";
import DetailPost from "./DetailPost";

// maps the list of posts and checks the "details" to see if it's a normal day post or a detailed search post

// detailed searches are for the Search page, normal is for daytoday Home page

function PostList({ posts, editPost, deletePost, details }) {
  return (
    <Container>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id} className="postContainer">
              {details ? (
                <DetailPost
                  post={post}
                  editPost={editPost}
                  deletePost={deletePost}
                />
              ) : (
                <DayPost
                  post={post}
                  editPost={editPost}
                  deletePost={deletePost}
                />
              )}
            </div>
          );
        })}
    </Container>
  );
}

export default PostList;
