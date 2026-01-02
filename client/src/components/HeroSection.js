// src/components/HeroSection.js
import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
  },
  {
    title: "1984",
    author: "George Orwell",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    img: "https://images.unsplash.com/photo-1544937950-fa07a98d237f",
  },
];

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
        color: "white",
        p: 4,
        borderRadius: 2,
        mb: 5,
      }}
    >
      {/* Hero Heading */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        📘 Why Reading Matters
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, maxWidth: "800px" }}>
        Reading enhances creativity, expands your knowledge, and improves emotional intelligence. 
        It opens doors to new worlds, cultures, and experiences. Start your reading journey today!
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button variant="contained" color="warning" size="large">
          Explore Books
        </Button>
        <Button variant="outlined" color="inherit" size="large">
          Start Reading
        </Button>
      </Box>

      {/* Book Cards */}
      <Grid container spacing={3}>
        {sampleBooks.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: 2,
                boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={book.img}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {book.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HeroSection;
