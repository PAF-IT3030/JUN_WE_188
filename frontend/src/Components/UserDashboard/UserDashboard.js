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
          <Workout />
        </div>
        <div className="user-dashboard-section meal-plan-section">
          <MealPlan />
        </div>
        <div className="user-dashboard-section feed-section">
          <Feed posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
