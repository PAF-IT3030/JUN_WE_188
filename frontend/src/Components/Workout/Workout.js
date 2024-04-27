import React, { useState } from "react";
import "../../Styles/Profile.css";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [bio, setBio] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleCoverPhotoUpload = (e) => {
    const file = e.target.files[0];
    setCoverPhoto(file);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([...posts, newPost.trim()]);
      setNewPost("");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverPhotoUpload}
          className="profile-cover-photo-upload"
        />
        <img
          src={coverPhoto ? URL.createObjectURL(coverPhoto) : ""}
          alt="Cover Photo"
          className="profile-cover-photo"
        />
        <div className="profile-picture-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="profile-picture-upload"
          />
          <img
            src={profilePicture ? URL.createObjectURL(profilePicture) : ""}
            alt="Profile Picture"
            className="profile-picture"
          />
        </div>
      </div>
      <div className="profile-bio">
        <textarea
          placeholder="Add your bio..."
          value={bio}
          onChange={handleBioChange}
          className="profile-bio-input"
        />
      </div>
      <div className="profile-posts">
        <h3>Posts</h3>
        {posts.map((post, index) => (
          <div key={index} className="profile-post">
            <p>{post}</p>
          </div>
        ))}
        <div className="profile-new-post">
          <textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={handlePostChange}
            className="profile-new-post-input"
          />
          <button onClick={handleAddPost} className="profile-post-button">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;