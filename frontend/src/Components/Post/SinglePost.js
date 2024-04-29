// SinglePost.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Styles/SinglePost.css";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/posts/${postId}`
        );
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching post");
        setLoading(false);
      }
    };

    fetchSinglePost();
  }, [postId]);

  return (
    <div>
      <h2>Single Post</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
