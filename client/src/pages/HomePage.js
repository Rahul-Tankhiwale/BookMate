import React from "react";
import { Container, Typography } from "@mui/material";
import Body from "../components/Body";

const HomePage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        📚 Welcome to BookMate
      </Typography>
      <Typography variant="h6" gutterBottom>
        Discover and share books with people near you.
      </Typography>
      <Body />
    </Container>
  );
};

export default HomePage;
