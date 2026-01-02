// src/pages/UploadBookPage.js
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function UploadBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login to upload a book.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/books/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Book uploaded successfully!");
      setFormData({ title: "", author: "", description: "" });
    } catch (err) {
      setMessage("❌ Failed to upload: " + err.response?.data?.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Upload a Book for Rent
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Upload Book
          </Button>
        </form>
        {message && (
          <Typography color="secondary" mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default UploadBookPage;
