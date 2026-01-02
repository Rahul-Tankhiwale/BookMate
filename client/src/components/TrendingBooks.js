// src/components/TrendingBooks.js
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import BookCard from "./BookCard";
import axios from "axios";

const TrendingBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books/nearby", {
        params: {
          lat: 18.5204,
          lng: 73.8567,
        },
      });
      setBooks(res.data);
    } catch (error) {
      console.error("Failed to load books", error);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        🔥 Books Near You
      </Typography>
      <Box sx={{ display: "flex", overflowX: "auto", gap: 2, py: 2 }}>
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <Typography>No books found nearby.</Typography>
        )}
      </Box>
    </>
  );
};

export default TrendingBooks;
