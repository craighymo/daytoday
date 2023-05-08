import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import EditPostForm from "../components/EditPostForm";
import PostList from "../components/PostList";
import NavBar from "../components/NavBar";

// Search needs a bit of work. Mostly on the server side
// A lot of the code here is a modified version of the Home code

function Search() {
  const [searchParams] = useSearchParams();

  // gets the text inputed into search text field (keyword)

  const keyword = searchParams.get("keyword");

  // controls whether or not the text editor will show 
  const [showEdit, setShowEdit] = useState(false);

  const [posts, setPosts] = useState([]);

  const [updateInput, setUpdateInput] = useState({
    _id: null,
    content: "",
  });

  useEffect(() => {
    getResults();
  }, [keyword]);


  // uses the keyword provided as query param then sets the posts to display results 
  const getResults = async () => {
    try {
      const response = await axios.get("/search/", {
        params: { keyword: keyword },
        withCredentials: true,
      });
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete("/posts/" + id, {
        withCredentials: true,
      });
      getResults();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (value) => {
    setUpdateInput({ ...updateInput, content: value });
  };

  const editPost = (post) => {
    setShowEdit(true);
    setUpdateInput(post);
  };

  // makes sure the text editor is loaded and then shoots to the bottom of the screen
  // text box will only appear if a post is selected to be edited

  useEffect(() => {
    if (showEdit) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth", 
      });
    }
  }, [showEdit]);

  const updatePost = async (event) => {
    try {
      event.preventDefault();

      await axios.put(
        "/posts/" + updateInput._id,
        { ...updateInput },
        { withCredentials: true }
      );
      getResults();
      setShowEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Search">
      <NavBar />
      <header className="search-header">results for "{keyword}"</header>
      <PostList
        posts={posts}
        editPost={editPost}
        deletePost={deletePost}
        details={true}
      />
      {showEdit && (
        <EditPostForm
          autoFocus
          updatePost={updatePost}
          updateInput={updateInput}
          handleCreate={handleUpdate}
        />
      )}
    </div>
  );
}

export default Search;
