import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";

const BookDetailsPage = () => {
  const { id } = useParams(); // Book ID from URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to fetch book", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to request the book.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/book-requests",
        {
          bookId: book._id,
          message: "Hi, I would like to borrow this book. Can we connect?",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("📩 Request sent to book owner!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send request.");
    }
  };

  if (loading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Typography mt={5} align="center" color="error">
        ❌ Book not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={book.imageUrl || "https://source.unsplash.com/400x300/?book"}
          alt={book.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Author: {book.author || "Unknown"}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {book.description || "No description available."}
          </Typography>

          {book.owner && (
            <>
              <Typography variant="subtitle2" color="text.secondary">
                Uploaded by: {book.owner.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Contact: {book.owner.email}
              </Typography>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleRequest}
            sx={{ mt: 3 }}
          >
            Request Book
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetailsPage;
