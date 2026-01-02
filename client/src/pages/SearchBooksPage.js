import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Alert
} from "@mui/material";
import axios from "axios";

const SearchBooksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term.");
      setResults([]);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/books/search", {
        params: { q: searchQuery }
      });
      setResults(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch search results.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Books
      </Typography>

      <TextField
        fullWidth
        label="Search by title or author"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        variant="outlined"
        sx={{ mt: 2, mb: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {results.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card>
              {book.imageUrl && (
                <CardMedia
                  component="img"
                  height="180"
                  image={book.imageUrl}
                  alt={book.title}
                />
              )}
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {book.author}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {book.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {results.length === 0 && searchQuery && !error && (
        <Typography sx={{ mt: 4 }} color="text.secondary">
          No books found matching "{searchQuery}".
        </Typography>
      )}
    </Container>
  );
};

export default SearchBooksPage;
