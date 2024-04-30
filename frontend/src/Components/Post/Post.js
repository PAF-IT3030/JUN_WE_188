import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/PostList.css"; // Import CSS file for styling
import { toast } from "react-toastify";

const PostList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");

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

  const handleImageClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/display?id=${id}`
      );
      setSelectedImage({ ...response.data, id });
      setDescription(response.data.description);
    } catch (error) {
      console.error("Error fetching post details:", error);
      toast.error(`Failed to display post ${id}!`);
    }
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  const handleDescriptionUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8070/update-description?id=${selectedImage.id}`,
        {
          description: description,
        }
      );
      // Update the description in the local state
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === selectedImage.id
            ? { ...img, description: description }
            : img
        )
      );
      toast.success("Description updated successfully!");
      setSelectedImage(null); // Close the popup window after update
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("Failed to update description.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8070/delete-post/${selectedImage.id}`
      );
      // Remove the deleted image from the local state
      setImages((prevImages) =>
        prevImages.filter((img) => img.id !== selectedImage.id)
      );
      toast.success("Image deleted successfully!");
      setSelectedImage(null); // Close the popup window after deletion
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image!");
    }
  };

  return (
    <div className="post-list-container">
      <h2 className="post-list-heading">My Posts</h2>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="post-list-items-container">
          {images.map((img) => (
            <div key={img.id} className="post-item">
              <img
                src={`http://localhost:8070/display?id=${img.id}`}
                alt="Uploaded"
                className="post-image"
                onClick={() => handleImageClick(img.id)}
              />

              <p className="post-description">{img.description}</p>
            </div>
          ))}
        </div>
      )}
      {selectedImage && (
        <div className="popup-container active">
          <div className="popup-content active">
            <button className="close-popup" onClick={handleClosePreview}>
              Close Preview
            </button>
            <img
              src={`http://localhost:8070/display?id=${selectedImage.id}`}
              alt="Selected"
              className="selected-image"
            />
            <textarea
              className="description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="update-description-button"
              onClick={handleDescriptionUpdate}
            >
              Update Description
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
