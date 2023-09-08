import React from "react";
import { Box, Typography } from "@mui/material";
import wellnessImage from "../assets/ready.avif";

const Banner = () => {
  return (
    <Box
      sx={{ mt: { lg: "20px", xs: "30px" }, ml: { sm: "50px" }, py: "10px" }}
      position="relative"
      p="20px"
    >
      <Box
        mb={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={wellnessImage}
          alt="banner"
          style={{ maxWidth: "50%", height: "30%" }}
        />
      </Box>
      <Typography
        fontWeight={700}
        color="gray"
        sx={{ fontSize: { lg: "44px", xs: "40px" }, textAlign: "center" }}
      >
        Welcome Back to WELLNESS_FIT
      </Typography>
      <Typography
        fontWeight={600}
        color="gray"
        opacity="0.7"
        sx={{ fontSize: { lg: "18px", xs: "16px" }, textAlign: "center" }}
      >
        Are you ready?
      </Typography>
    </Box>
  );
};
export default Banner;
