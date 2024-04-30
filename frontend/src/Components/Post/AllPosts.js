import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../Styles/AllPosts.css";

const AllPosts = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:8070/all-posts"); // Updated endpoint
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("An error occurred while loading the posts.");
      }
    };

    fetchImages();
  }, []);

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
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("Failed to update description.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/delete-post?id=${id}`);
      // Remove the deleted image from the local state
      setImages((prevImages) => prevImages.filter((img) => img.id !== id));
      toast.success("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  return (
    <div className="all-posts-container">
      {/* ///////////////////////////////////////////
      <button
        className="post-list__preview-btn"
        onClick={() => handlePreview(post.id)}
      >
        Preview
      </button> */}
      <h2>All Posts</h2>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="images-container">
          {images.map((img) => (
            <div key={img.id} className="image-item">
              <img
                src={`http://localhost:8070/display?id=${img.id}`}
                alt="Uploaded"
                className="uploaded-image"
              />
              <p className="image-description">{img.description}</p>
              <input
                type="text"
                value={img.description}
                onChange={(e) =>
                  handleDescriptionUpdate(img.id, e.target.value)
                }
                className="edit-description-input"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
