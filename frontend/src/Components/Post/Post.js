// Post.js
import React from "react";
import "../../Styles/Post.css";

const Post = ({ post, onLike, onComment, onEdit, onDelete }) => {
  const handleLike = () => {
    onLike(post.id);
  };

  const handleComment = () => {
    onComment(post.id);
  };

  const handleEdit = () => {
    onEdit(post.id);
  };

  const handleDelete = () => {
    onDelete(post.id);
  };

  return (
    <div className="post-container">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <button className="post-action-btn" onClick={handleLike}>
          Like
        </button>
        <button className="post-action-btn" onClick={handleComment}>
          Comment
        </button>
        <button className="post-action-btn" onClick={handleEdit}>
          Edit
        </button>
        <button className="post-action-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
