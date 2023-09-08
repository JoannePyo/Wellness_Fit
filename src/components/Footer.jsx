import React from "react";
import { Box, Stack } from "@mui/material";
import Logo from "../assets/logo.png";

const Footer = () => (
  <Box bgcolor="#000000">
    <Stack sx={{ alignItems: "center" }} flexWrap="wrap" px="40px" pt="20px">
      <img src={Logo} alt="logo" style={{ width: "100px", height: "80px" }} />
      <Box height="20px" /> {/* 추가된 공백 요소 */}
    </Stack>
  </Box>
);

export default Footer;
