import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/PostList.css"; // Import CSS file for styling
import { toast } from "react-toastify";

const PostList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:8070/all-posts");
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        //toast.error("You have no posts.");
      }
    };

    fetchImages();
  }, []);

  // Fetch details of a specific post when image is clicked
  // Fetch details of a specific post when image is clicked
  const handleImageClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/display?id=${id}`
      );
      setSelectedPost(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
      toast.error(`Failed to display post ${id}!`);
    }
  };

  // Close the preview and reset selectedPost state
  const handleClosePreview = () => {
    setSelectedPost(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/delete-post/${id}`);
      // Reload the page after successful deletion
      window.location.reload();
      toast.success(`Image deleted successfully ${id}`);
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(`Failed to delete image ${id}!`);
    }
  };

  const handleDescriptionUpdate = async (id) => {
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
      toast.success("Description updated successfully!");
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("Failed to update description.");
    }
  };

  return (
    <div className="post-list">
      <h2>My Posts</h2>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <ul className="post-list__items">
          {images.map((img) => (
            <div key={img.id} className="image-item">
              <img
                src={`http://localhost:8070/display?id=${img.id}`}
                alt="Uploaded"
                className="uploaded-image"
                onClick={() => handleImageClick(img.id)}
              />
              <p className="image-description">{img.description}</p>
              <input
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="edit-description-input"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="delete-button"
              >
                Delete
              </button>
              <button
                onClick={() => handleDescriptionUpdate(img.id)}
                className="update-description-button"
              >
                Update Description
              </button>
            </div>
          ))}
        </ul>
      )}
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
