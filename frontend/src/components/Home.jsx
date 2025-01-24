import React from "react";
import { Button, Box, Typography, AppBar, Toolbar, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";

// Create a fade-in animation
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Create a styled version of the Link component with hover effect
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
  margin: "0 15px",
  padding: "8px 8px", // Adds padding for better appearance
  borderRadius: "8px", // Rounded corners for each link
  position: "relative",
  transition: "all 0.3s ease", // Smooth transition
  display: "inline-block", // Keeps the link inline with other items
  "&:hover": {
    color: "#ddd", // Change the text color on hover
  },
  // Add sliding animation effect
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px", // Line thickness
    backgroundColor: "#ddd", // Color of the underline
    transform: "scaleX(0)", // Initial state is hidden
    transformOrigin: "bottom right", // Start the animation from right to left
    transition: "transform 0.3s ease", // Smooth transition for the line
  },
  "&:hover:after": {
    transform: "scaleX(1)", // On hover, the line scales to full width
    transformOrigin: "bottom left", // The animation starts from left to right
  },
});

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "black",
        color: "white",
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Portfolio Tracker
          </Typography>
          <Box>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/dashboard">Dashboard</StyledLink>
            <StyledLink to="/add-stock">Add Stock</StyledLink>
            <StyledLink to="/stocks">Holdings</StyledLink>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Welcome Section */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: "bold",
            fontSize: "3rem",
            animation: `${fadeIn} 1s ease-out`, // Apply fade-in animation
          }}
        >
          Welcome to Portfolio Tracker
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            maxWidth: "600px",
            animation: `${fadeIn} 1.5s ease-out`, // Apply fade-in animation with delay
          }}
        >
          Track, manage, and optimize your investments.
        </Typography>

        {/* Get Started Button */}
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:hover": { bgcolor: "#ddd" },
              padding: "12px 24px",
              borderRadius: "25px",
              fontSize: "1.1rem",
            }}
          >
            Get Started
          </Button>
        </Link>
      </Container>
    </Box>
  );
}

export default Home;
