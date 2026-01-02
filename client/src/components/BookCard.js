// src/components/BookCard.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ m: 2, cursor: 'pointer' }}
      onClick={() => navigate(`/book/${book._id}`)}
    >
      <CardMedia
        component="img"
        height="180"
        image={book.imageUrl || 'https://source.unsplash.com/400x300/?book'}
        alt={book.title}
      />
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="subtitle2">By {book.author}</Typography>
        <Typography variant="body2">{book.description}</Typography>
        <Typography variant="caption">
          Uploaded by: {book.owner?.name || 'Unknown'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BookCard;
