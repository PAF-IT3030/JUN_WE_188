import React from "react";
import "../../Styles/Feed.css"; // Import your CSS file
import Post from "../Post/Post";

const Feed = ({ posts }) => {
  // Check if posts is undefined or null
  // if (!posts || posts.length === 0) {
  //   return <div>No posts available</div>;
  // }

  // Hard-coded posts for demonstration
  const hardCodedPosts = [
    {
      id: 1,
      title: " Post 1",
      content: "This is the content of the first hard-coded post.",
      author: "Hard Coder",
    },
    {
      id: 2,
      title: " Post 2",
      content: "This is the content of the second hard-coded post.",
      author: "Coder Hard",
    },
    {
      id: 3,
      title: " Post 3",
      content: "This is the content of the third hard-coded post.",
      author: "The Coder",
    },
  ];

  return (
    <div className="feed-container">
      <h2 className="feed-heading">Feed</h2>
      <div className="feed-content">
        {/* Map through the hard-coded posts array */}
        {hardCodedPosts.map((post) => (
          <div key={post.id} className="post-container">
            {/* Render individual Post components */}
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
