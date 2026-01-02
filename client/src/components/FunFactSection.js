// src/components/FunFactSection.js
import React from "react";
import { Typography } from "@mui/material";

const FunFactSection = () => {
  return (
    <>
      <Typography variant="h6" mt={5} gutterBottom>
        ✍️ Did You Know?
      </Typography>
      <Typography variant="body2">
        Writing and reading date back to over 5,000 years. The earliest forms were cuneiform scripts from Mesopotamia. 
        From scrolls to digital books, the passion for storytelling and knowledge sharing has only grown stronger.
      </Typography>
    </>
  );
};

export default FunFactSection;
