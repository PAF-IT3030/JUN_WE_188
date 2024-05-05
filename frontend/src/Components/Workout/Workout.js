import React, { useState } from "react";
import axios from "axios";
import "../../Styles/Workout.css";

const AddFitnessActivityForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8070/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Activity added successfully!");
      setName("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding activity:", error);
      alert("Failed to add activity!");
    }
  };

  return (
    <div className="add-activity-form">
      <h2>Add New Fitness Activity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddFitnessActivityForm;
