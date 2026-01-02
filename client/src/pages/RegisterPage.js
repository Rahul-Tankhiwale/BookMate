import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Grid,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const countries = [
  { name: "India", code: "+91" },
  { name: "USA", code: "+1" },
  { name: "UK", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "Germany", code: "+49" },
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    countryCode: "+91",
    email: "",
    password: "",
    phone: "",
    state: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleRegister = async () => {
    const { name, email, password, phone, country, countryCode, state, city, pincode } = formData;

    if (!name || !email || !password || !phone || !country || !state || !city || !pincode) {
      setError("❌ Please fill in all required fields.");
      return;
    }

    try {
       await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        phone,
        country,
        countryCode,
        state,
        city,
        pincode,
      });

      setSuccess("✅ Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Registration failed.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2} bgcolor="#f9f9f9">
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Grid container spacing={3}>
          {/* LHS */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Full Name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="phone"
              label="Phone Number"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          {/* RHS */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="country"
              label="Country"
              fullWidth
              select
              value={formData.country}
              onChange={(e) => {
                const selected = countries.find((c) => c.name === e.target.value);
                setFormData({
                  ...formData,
                  country: e.target.value,
                  countryCode: selected?.code || "+91",
                });
              }}
              margin="normal"
            >
              {countries.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name} ({option.code})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="state"
              label="State"
              fullWidth
              value={formData.state}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="city"
              label="City"
              fullWidth
              value={formData.city}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="pincode"
              label="Pincode"
              fullWidth
              value={formData.pincode}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          sx={{ mt: 3 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
