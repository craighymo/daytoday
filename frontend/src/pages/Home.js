import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { format, subDays, addDays } from "date-fns";
import TodoList from "../components/Reminders";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import NavBar from "../components/NavBar";
import CreatePostForm from "../components/CreatePostForm";
import EditPostForm from "../components/EditPostForm";
import PostList from "../components/PostList";
import DayHeader from "../components/DayHeader";

// the main hub of the website. Includes the navbar, reminders and posts.

function Home() {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [posts, setPosts] = useState([]);

  const [createInput, setCreateInput] = useState({
    content: "",
  });

  const [updateInput, setUpdateInput] = useState({
    _id: null,
    content: "",
  });

  // controls whether or not the text editor will be for editing or posting
  const [editMode, setEditMode] = useState(false);

  // makes sure to get posts when page is loaded or date is changed
  useEffect(() => {
    getPosts();
  }, [displayDate]);

  // min/max dates for date picker
  const minDate = new Date("2023-01-02");
  const maxDate = new Date();

  // gets posts from backend only within specified date and sets them
  const getPosts = async () => {
    try {
      const date = format(displayDate, "Y-LL-dd");
      const response = await axios.get("/posts/" + date, {
        withCredentials: true,
      });
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (event) => {
    try {
      event.preventDefault();

      // sends the post input in request body and gets back the new post
      const response = await axios.post("/posts/", createInput, {
        withCredentials: true,
      });

      // new post is added to array of existing posts with spread 
      setPosts([...posts, response.data.post]);

       // resets post input to be empty
      setCreateInput({ content: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete("/posts/" + id, {
        withCredentials: true,
      });
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (event) => {
    try {
      event.preventDefault();
      await axios.put(
        "/posts/" + updateInput._id,
        { ...updateInput },
        { withCredentials: true }
      );
      getPosts();
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  // handles the arrows (left and right) for "pagination"

  const handleDateChangeL = () => {
    const newDate = subDays(displayDate, 1);
    if (newDate < minDate) {
      return;
    }
    setDisplayDate(newDate);
  };

  const handleDateChangeR = () => {
    const newDate = addDays(displayDate, 1);
    if (newDate > new Date()) {
      return;
    }
    setDisplayDate(newDate);
  };

  // handles inputed text for create/update

  const handleCreate = (value) => {
    setCreateInput({ ...createInput, content: value });
  };

  const handleUpdate = (value) => {
    setUpdateInput({ ...updateInput, content: value });
  };

  // page shoots down to text editor and sets the input to the post to be edited
  const editPost = (post) => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

    setUpdateInput(post);
    setEditMode(true);
  };

  return (
    <div className="App">
      <NavBar displayDate={displayDate} setDisplayDate={setDisplayDate} />
      <div className="app-body">
        <TodoList />
        <DayHeader
          displayDate={displayDate}
          setDisplayDate={setDisplayDate}
          minDate={minDate}
          maxDate={maxDate}
          handleDateChangeL={handleDateChangeL}
          handleDateChangeR={handleDateChangeR}
        />

        <PostList
          posts={posts}
          editPost={editPost}
          deletePost={deletePost}
          details={false}
        />

        {!editMode && (
          <CreatePostForm
            createPost={createPost}
            createInput={createInput}
            handleCreate={handleCreate}
          />
        )}
        {editMode && (
          <EditPostForm
            updatePost={updatePost}
            updateInput={updateInput}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
