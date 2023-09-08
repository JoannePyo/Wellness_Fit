import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./bmi.scss";
import BMIRightbar from "../../components/bmiRightbar/BMIRightbar";

const Bmi = () => {
  return (
    <div className="bmi">
      <>
        <div className="bmiContainer">
          <Sidebar />
          <BMIRightbar />
        </div>
      </>
    </div>
  );
};

export default Bmi;
