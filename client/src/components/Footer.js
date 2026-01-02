import React from "react";
import { Box, Container, Typography, Link, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        py: 4,
        mt: 6,
        borderTop: "1px solid #ddd",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" },
            gap: 2,
          }}
        >
          <Box>
            <Link href="/" underline="none" sx={{ mr: 2 }}>
              Home
            </Link>
            <Link href="/faq" underline="none" sx={{ mr: 2 }}>
              FAQ
            </Link>
            <Link href="/contact" underline="none" sx={{ mr: 2 }}>
              Contact Us
            </Link>
            <Link href="#" underline="none">
              Change Language
            </Link>
          </Box>

          <Box>
            <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} BookMate. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
