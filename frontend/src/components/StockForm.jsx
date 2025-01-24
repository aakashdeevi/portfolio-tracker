import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/system";

// Create a styled version of the Link component to add hover effects
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

function StockForm() {
  const [stock, setStock] = useState({ ticker: "", quantity: 0, buyPrice: 0 });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`/stocks/${id}`)
        .then((response) => setStock(response.data))
        .catch((error) => console.error("Error fetching stock:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = id
      ? axios.put(`/stocks/${id}`, stock)
      : axios.post("/stocks", stock);
    apiCall
      .then(() => navigate("/stocks"))
      .catch((error) => console.error("Error saving stock:", error));
  };

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
        maxWidth="sm"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#1e1e1e",
          borderRadius: 2,
          padding: 4,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.8)",
          marginY: 6,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "#ffffff",
            fontSize: "1.8rem",
          }}
        >
          {id ? "Edit Stock" : "Add Stock"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Stock Ticker"
            variant="outlined"
            fullWidth
            name="ticker"
            value={stock.ticker}
            onChange={handleChange}
            sx={{
              mb: 3,
              "& .MuiInputBase-input": { color: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#bdbdbd" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#888" },
              },
            }}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            type="number"
            name="quantity"
            value={stock.quantity}
            onChange={handleChange}
            sx={{
              mb: 3,
              "& .MuiInputBase-input": { color: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#bdbdbd" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#888" },
              },
            }}
          />
          <TextField
            label="Buy Price"
            variant="outlined"
            fullWidth
            type="number"
            name="buyPrice"
            value={stock.buyPrice}
            onChange={handleChange}
            sx={{
              mb: 4,
              "& .MuiInputBase-input": { color: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#bdbdbd" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#888" },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#0077ff",
              color: "#fff",
              textTransform: "none",
              padding: "10px 0",
              borderRadius: 2,
              fontSize: "1rem",
              "&:hover": { bgcolor: "#005bb5" },
            }}
          >
            {id ? "Update Stock" : "Add Stock"}
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default StockForm;
