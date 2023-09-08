import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import WTRightbar from "../../components/wtRightbar/WTRightbar";
import "./workoutTracker.scss";

const WorkoutTracker = () => {
  return (
    <div className="workoutTracker">
      <div className="wtContainer">
        <Sidebar />
        <WTRightbar />
      </div>
    </div>
  );
};

export default WorkoutTracker;
