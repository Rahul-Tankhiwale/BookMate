// src/pages/BookListPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  Grid
} from "@mui/material";

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books/nearby?lat=18.52&lng=73.85");
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch books", err);
    }
  };

  fetchBooks();
}, []); // <--- empty array means run only once on component mount


  const filteredBooks = books.filter((book) =>
    (book.title + book.author).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Nearby Books
        </Typography>

        <TextField
          fullWidth
          label="Search by title or author"
          variant="outlined"
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Grid container spacing={2}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    by {book.author}
                  </Typography>
                  <Typography variant="body2">{book.description}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Uploaded by: {book.owner.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredBooks.length === 0 && (
          <Typography mt={4} color="error">
            No books found matching your search.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default BookListPage;
