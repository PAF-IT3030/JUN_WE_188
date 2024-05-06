import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/Workout.css";

function Workout() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:8070/workoutall-posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addPost = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    axios
      .post("http://localhost:8070/workoutadd", formData)
      .then((response) => {
        if (response.data && response.data !== -1) {
          fetchPosts();
        } else {
          alert("Failed to add post!");
        }
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:8070/workoutdelete-post/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchPosts();
        } else {
          alert("Failed to delete post!");
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const editPost = (id, newDescription) => {
    axios
      .put(`http://localhost:8070/workoutupdate-description?id=${id}`, {
        description: newDescription,
      })
      .then((response) => {
        if (response.status === 200) {
          fetchPosts();
        } else {
          alert("Failed to update description!");
        }
      })
      .catch((error) => {
        console.error("Error updating description:", error);
      });
  };

  return (
    <div className="workout">
      <h1>Workout Posts</h1>

      {/* Form to add a new post */}
      <div className="form-container">
        <input
          type="file"
          onChange={handleImageChange}
          className="file-input"
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
          className="description-input"
        />
        <button onClick={addPost} className="add-button">
          Add Post
        </button>
      </div>

      <br />

      {/* Display all posts */}
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <img src={`data:image/jpeg;base64,${post.image}`} alt="Workout" />
            <p>{post.description}</p>
            <div>
              <button
                onClick={() =>
                  editPost(post.id, prompt("Enter new description:"))
                }
              >
                Edit
              </button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workout;
