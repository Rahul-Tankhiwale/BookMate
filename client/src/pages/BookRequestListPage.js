// client/src/pages/BookRequestListPage.js

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
} from "@mui/material";
import axios from "axios";

const BookRequestListPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/book-requests/my-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  const updateStatus = async (requestId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/book-requests/${requestId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests(); // Refresh after update
    } catch (err) {
      console.error("Failed to update request status", err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📩 Incoming Book Requests
      </Typography>

      {requests.length === 0 ? (
        <Typography>No book requests yet.</Typography>
      ) : (
        requests.map((req) => (
          <Card key={req._id} sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {req.requester?.name} ({req.requester?.email})
              </Typography>
              <Typography variant="body2" sx={{ my: 1 }}>
                Book: <strong>{req.book?.title}</strong>
              </Typography>
              <Typography variant="body2">Message: "{req.message}"</Typography>

              <Box mt={2}>
                <Chip label={`Status: ${req.status}`} color="primary" />

                {/* Show Accept/Reject only if status is pending */}
                {req.status === "pending" && (
                  <Box mt={2} display="flex" gap={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => updateStatus(req._id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => updateStatus(req._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default BookRequestListPage;
