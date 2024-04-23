import React, { useState } from "react";
import "../../Styles/Workout.css"; // Import your CSS file

const Workout = () => {
  const [workoutStatus, setWorkoutStatus] = useState("");

  const handleShareWorkout = () => {
    // Logic for sharing workout status
    console.log("Sharing workout status:", workoutStatus);
  };

  return (
    <div className="workout-container">
      <h2 className="workout-heading">Workout</h2>
      <input
        type="text"
        placeholder="Enter workout status"
        value={workoutStatus}
        onChange={(e) => setWorkoutStatus(e.target.value)}
        className="workout-input" // Add classname for input
      />
      <button onClick={handleShareWorkout} className="workout-button">
        Share
      </button>
    </div>
  );
};

export default Workout;
