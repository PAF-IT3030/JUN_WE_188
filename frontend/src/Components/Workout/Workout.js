import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/Workout.css";
import backgroundImage from "../Workout/workout.jpg";

function Workout() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

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
    setError(""); // Clear previous error message when description changes
  };

  const validateDescription = () => {
    if (description.trim() === "") {
      setError("Description cannot be empty");
      return false;
    }
    return true;
  };

  const addPost = () => {
    if (!validateDescription()) {
      return; // Don't proceed if validation fails
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    axios
      .post("http://localhost:8070/workoutadd", formData)
      .then((response) => {
        if (response.data && response.data !== -1) {
          fetchPosts();
          setDescription(""); // Clear input field after successful addition
        } else {
          alert("Failed to add post!");
        }
      })
      .catch((error) => {
        console.error("Error adding post:", error);
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

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="workout">
        <h1 className="text-white text-4xl">Workout Posts</h1>

        {/* Form to add a new post */}
        <div className="form-container p-4 bg-white rounded shadow-md">
          <input
            type="file"
            onChange={handleImageChange}
            className="custom-file-input mb-4"
          />

          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            className="description-input border border-gray-300 p-2 rounded mb-4"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={addPost}
            className="add-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
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
    </div>
  );
}

export default Workout;
