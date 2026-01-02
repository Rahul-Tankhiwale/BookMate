// src/components/Body.js
import React from "react";
import { Box, Divider } from "@mui/material";
import HeroSection from "./HeroSection";
import TrendingBooks from "./TrendingBooks";
import FunFactSection from "./FunFactSection";

const Body = () => {
  return (
    <Box mt={4}>
      <HeroSection />
      <Divider sx={{ my: 3 }} />
      <TrendingBooks />
      <Divider sx={{ my: 3 }} />
      <FunFactSection />
    </Box>
  );
};

export default Body;
