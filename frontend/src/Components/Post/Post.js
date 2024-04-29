import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/PostList.css"; // Import CSS file for styling
import { toast } from "react-toastify";

const PostList = () => {
  const [setImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch all posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8070/all-posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load post list!");
      }
    };

    fetchPosts();
  }, []);

  // Fetch details of a specific post when preview button is clicked
  const handlePreview = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/display/${postId}`
      );

      setSelectedPost(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
      toast.error(`Failed to display post ${postId}!`);
    }
  };

  // Close the preview and reset selectedPost state
  const handleClosePreview = () => {
    setSelectedPost(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/delete-post?id=${id}`);
      // Remove the deleted image from the local state
      setImages((prevImages) => prevImages.filter((img) => img.id !== id));
      toast.success(`Image deleted successfully ${id}`);
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(`Failed to delete image " ${id}`);
    }
  };

  const handleDescriptionUpdate = async (id, updatedDescription) => {
    try {
      await axios.put(`http://localhost:8070/update-description?id=${id}`, {
        description: updatedDescription,
      });
      // Update the description in the local state
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === id ? { ...img, description: updatedDescription } : img
        )
      );
      toast.success("Description updated successfully.");
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("Failed to update description.");
    }
  };
  return (
    <div className="post-list">
      <h2>My Posts</h2>
      <ul className="post-list__items">
        {posts.map((post) => (
          <li key={post.id} className="post-list__item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="post-list__buttons">
              <button
                className="post-list__preview-btn"
                onClick={() => handlePreview(post.id)}
              >
                Preview
              </button>
              <button
                className="post-list__edit-btn"
                onClick={() => handlePreview(post.id)}
              >
                Edit
              </button>
              <button
                className="post-list__delete-btn"
                onClick={() => handleDescriptionUpdate(post.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedPost && (
        <div className="post-preview">
          <h2>Post Preview</h2>
          <button
            className="post-preview__close-btn"
            onClick={handleClosePreview}
          >
            Close Preview
          </button>
          <h3>{selectedPost.title}</h3>
          <p>{selectedPost.content}</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
