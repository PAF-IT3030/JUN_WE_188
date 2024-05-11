import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faTimes,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../../Styles/PostList.css"; // Import CSS file for styling

const PostList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [commentInput, setCommentInput] = useState(""); // State variable for comment input
  const [comments, setComments] = useState([]); // State variable for comments

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:8070/all-posts");
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        //toast.error("Failed to fetch posts.");
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
      fetchComments(id); // Fetch comments for the selected post
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

  const fetchComments = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8070/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      // Make a POST request to save the comment to the database
      const response = await axios.post(
        `http://localhost:8070/add-comment/${selectedImage.id}`,
        commentInput // Send the comment input directly
      );
      // Update the state with the new comment
      setComments([...comments, response.data]);
      // Clear the comment input field
      setCommentInput("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8070/delete-comment/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleLike = async () => {
    try {
      console.log("did not created yet");
    } catch (error) {
      console.error("Error liking post:", error);
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
              {selectedImage && selectedImage.id === img.id && <></>}
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="popup-container active">
          <div className="popup-content active">
            <img
              src={`http://localhost:8070/display?id=${selectedImage.id}`}
              alt="Selected"
              className="selected-image"
            />
            <button
              className="update-description-button"
              onClick={handleDescriptionUpdate}
            >
              <FontAwesomeIcon icon={faEdit} /> Update
            </button>
            <button className="delete-button" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="close-popup" onClick={handleClosePreview}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <textarea
              className="description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Update your Description here.."
            />

            {/* Comment input field */}
            <div className="like-comment-container">
              <input
                className="commentcontainer"
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              {/* Button to submit the comment */}
              <button
                className="submit-comment-button"
                onClick={handleCommentSubmit}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              {/* Like button */}
              <button className="like-button" onClick={handleLike}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>

            {/* Display comments */}
            <div className="comments-section">
              <p className="posts-comments">Comments...</p>
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.content}</p>
                  <button
                    className="delete-comment-button"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
