import { format } from "date-fns";
import PostButtons from "./PostButtons";

// Post-time is within one day. Format only shows the time

// dangerouslySetInnerHTML makes the HTML from react-quill(ql-editor) functional and not just text

// if a post has been updated/edited it displays the time next to the original time of post

function DayPost({ post, editPost, deletePost }) {
  return (
    <div className="post" key={post._id}>
      <div className="post-times">
        <time className="post-time">
          {format(new Date(post.createdAt), "h:mm a")}
        </time>
        {new Date(post.updatedAt) > new Date(post.createdAt) && (
          <time className="update-time">
            (edited: {format(new Date(post.updatedAt), "MMM d, Y h:mm a")})
          </time>
        )}
      </div>
      <div className="post-content">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <PostButtons post={post} editPost={editPost} deletePost={deletePost} />
    </div>
  );
}
export default DayPost;
