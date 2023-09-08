import React from "react";
import { Box } from "@mui/material";
import "./rightbar.scss";
import Banner from "../Banner";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <Box>
        <Banner />
      </Box>
    </div>
  );
};

export default Rightbar;
