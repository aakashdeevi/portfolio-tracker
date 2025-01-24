import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/system";

// Create a styled version of the Link component with hover animations
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

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios
      .get("/stocks")
      .then((response) => setStocks(response.data))
      .catch((error) => console.error("Error fetching stocks:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/stocks/${id}`)
      .then(() => setStocks(stocks.filter((stock) => stock.id !== id)))
      .catch((error) => console.error("Error deleting stock:", error));
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
      <Box sx={{ padding: "30px", flex: 1 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            fontWeight: "bold",
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          Stocks
        </Typography>

        <TableContainer
  component={Paper}
  sx={{
    bgcolor: "#1e1e1e",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  }}
>
  <Table>
    <TableHead>
      <TableRow sx={{ bgcolor: "#444" }}>
        <TableCell
          sx={{
            fontWeight: "bold",
            color: "#fff",
            fontSize: "1.1rem",
            textAlign: "center",
            padding: "16px",
          }}
        >
          Ticker
        </TableCell>
        <TableCell
          sx={{
            fontWeight: "bold",
            color: "#fff",
            fontSize: "1.1rem",
            textAlign: "center",
            padding: "16px",
          }}
        >
          Quantity
        </TableCell>
        <TableCell
          sx={{
            fontWeight: "bold",
            color: "#fff",
            fontSize: "1.1rem",
            textAlign: "center",
            padding: "16px",
          }}
        >
          Buy Price
        </TableCell>
        <TableCell
          sx={{
            fontWeight: "bold",
            color: "#fff",
            fontSize: "1.1rem",
            textAlign: "center",
            padding: "16px",
          }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {stocks.map((stock) => (
        <TableRow
          key={stock.id}
          sx={{
            "&:nth-of-type(odd)": { bgcolor: "#2a2a2a" },
            "&:nth-of-type(even)": { bgcolor: "#333" },
            "&:hover": { bgcolor: "#555", transform: "scale(1.01)" },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <TableCell
            sx={{
              color: "#fff",
              fontSize: "0.95rem",
              textAlign: "center",
              padding: "12px",
            }}
          >
            {stock.ticker}
          </TableCell>
          <TableCell
            sx={{
              color: "#fff",
              fontSize: "0.95rem",
              textAlign: "center",
              padding: "12px",
            }}
          >
            {stock.quantity}
          </TableCell>
          <TableCell
            sx={{
              color: "#fff",
              fontSize: "0.95rem",
              textAlign: "center",
              padding: "12px",
            }}
          >
            {stock.buyPrice}
          </TableCell>
          <TableCell sx={{ textAlign: "center", padding: "12px" }}>
            <Link
              to={`/edit-stock/${stock.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="warning"
                size="small"
                sx={{
                  fontSize: "0.85rem",
                  marginRight: "8px",
                  textTransform: "none",
                }}
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ fontSize: "0.85rem", textTransform: "none" }}
              onClick={() => handleDelete(stock.id)}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      </Box>
    </Box>
  );
}

export default StockList;
