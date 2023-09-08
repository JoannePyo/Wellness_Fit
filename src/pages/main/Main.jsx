import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./main.scss";

const Main = () => {
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar />
        <Rightbar />
      </div>
    </div>
  );
};

export default Main;
