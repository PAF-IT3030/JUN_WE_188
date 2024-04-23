import React from "react";
import "../../Styles/UserDashboard.css"; // Import your CSS file
import Feed from "../Feed/Feed";
import Workout from "../Workout/Workout";
import MealPlan from "../MealPlan/MealPlan";

const UserDashboard = ({ posts }) => {
  return (
    <div className="user-dashboard-container">
      <h2 className="user-dashboard-heading">User Dashboard</h2>
      <div className="user-dashboard-content">
        <div className="user-dashboard-section workout-section">
          <h3 className="section-heading">Workout</h3>
          <Workout />
        </div>
        <div className="user-dashboard-section meal-plan-section">
          <h3 className="section-heading">Meal Plan</h3>
          <MealPlan />
        </div>
        <div className="user-dashboard-section feed-section">
          <h3 className="section-heading">Feed</h3>
          <Feed posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
