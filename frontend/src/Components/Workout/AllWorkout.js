import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  IconButton,
  Avatar,
  CardHeader,
  CardActions,
  Divider,
} from "@mui/material";
import {
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import backgroundImage from "../Workout/workout.jpg";

function AllWorkout() {
  const [posts, setPosts] = useState([]);

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

  const handleLike = (id) => {
    // Send a request to your backend to increment the like count of the post with the given id
    axios
      .put(`http://localhost:8070/workoutlike/${id}`)
      .then((response) => {
        // If the like count is updated successfully, fetch the posts again to update the UI
        if (response.status === 200) {
          fetchPosts();
        } else {
          console.error("Failed to update like count");
        }
      })
      .catch((error) => {
        console.error("Error updating like count:", error);
      });
  };

  const handleComment = (id) => {
    // Handle comment functionality
  };

  return (
    <div
      style={{
        marginBottom: "1px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <br />
        <Typography
          fontSize="40px"
          variant="h1"
          component="h2"
          color="#fff"
          gutterBottom
        >
          Workout Posts
        </Typography>

        <br />

        {/* Display all posts */}
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card>
                <CardHeader
                  avatar={<Avatar aria-label="User" src={post.avatar} />}
                  title={post.username}
                  subheader={post.timestamp}
                />
                {post.image && (
                  <img
                    src={`data:image/jpeg;base64,${post.image}`}
                    alt="Workout"
                  />
                )}
                <CardContent>
                  <Typography variant="body1">{post.description}</Typography>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                  <IconButton onClick={() => handleLike(post.id)}>
                    <FavoriteBorderOutlined />
                  </IconButton>
                  <Typography>{post.likes}</Typography>
                  <IconButton onClick={() => handleComment(post.id)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{post.comments}</Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AllWorkout;
