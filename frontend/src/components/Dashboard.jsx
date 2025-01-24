import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,

} from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Styled link with hover animation
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


function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalValue: 0,
    topStock: "",
    portfolioDistribution: {},
    gainLossAnalytics: {},
    netGainLoss: 0,
    leastStock: "",
    topStockPercentageGain: 0,
    leastStockPercentageLoss: 0,
    stockHoldings: [], // Initialize stock holdings
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/dashboard") // Replace with the actual backend URL
      .then((response) => {
        setMetrics(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      });
  }, []);

  // Data for the Pie chart (portfolio distribution)
  const pieChartData = {
    labels: Object.keys(metrics.portfolioDistribution),
    datasets: [
      {
        data: Object.values(metrics.portfolioDistribution),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: "#FF5733",
      },
    ],
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
      <AppBar position="sticky" sx={{ bgcolor: "black" }}>
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

      {/* Main Content Section */}
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#000', // Dark gray for inner content areas
          height: '100%', // Ensure the height of the content fills the viewport
          color: '#FFFFFF',
          overflowY: 'scroll', /* Allow scrolling but hide the scrollbar */
        }}
      >
        <Grid container spacing={2}>
          {/* Total Portfolio Value Widget */}
          <Grid item xs={12}>
            <Card sx={{ bgcolor: "#1E4620", color: "#FFFFFF" }}>
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                    Total Portfolio Value
                  </Typography>
                  <RefreshIcon sx={{ color: '#FFFFFF', opacity: 0.7 }} />
                </Grid>
                <Typography variant="h3" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                  ${metrics.totalValue.toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Updated just now
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Summary Cards */}

           {/* Net Gain/Loss Widget */}

           <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#1E1E1E', color: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ opacity: 1 }}>
                  Net Gain/Loss
                </Typography>
                <Typography variant="h5"sx={{  fontWeight: 'bold',marginY: 1,
                    color: metrics.netGainLoss >= 0 ? 'green' : 'red', // Green for gain, red for loss
                  }}
                >
                  ${metrics.netGainLoss.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
           


          {/* Top Performing Stock Widget */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#1E1E1E', color: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ opacity: 1 }}>
                  Top Performing Stock
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginY: 1 }}>
                  {metrics.topStock} 
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Least Performing Stock Widget */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#1E1E1E', color: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ opacity: 1 }}>
                  Least Performing Stock
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginY: 1 }}>
                  {metrics.leastStock} 
                </Typography>
              </CardContent>
            </Card>
          </Grid>

         
          {/* Portfolio Distribution Widget (Pie Chart) */}
         {/* Portfolio Distribution Widget (Pie Chart) */}
         <Grid item xs={12} md={6}>
  <Card sx={{ bgcolor: "#1E1E1E", color: "#FFFFFF" }}>
    <CardContent>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Portfolio Distribution
      </Typography>
      <Box sx={{ position: "relative", height: 400, width: 600 }}>
        <Pie
          data={{
            ...pieChartData,
            labels: pieChartData.labels.map((label, index) => {
              // Calculate percentage for each segment
              const total = pieChartData.datasets[0].data.reduce((acc, val) => acc + val, 0);
              const percentage = ((pieChartData.datasets[0].data[index] / total) * 100).toFixed(2);
              return `${label} (${percentage}%)`; // Add percentage to label
            }),
          }}
          options={{
            plugins: {
              tooltip: {
                enabled: true, // Enables tooltip
              },
              legend: {
                position: "right", // Position the legend on the right
                labels: {
                  boxWidth: 30, // Size of the label box
                  padding: 30, // Space between the labels and pie chart
                  font: {
                    size: 16, // Increase the font size of the labels
                    family: "Arial, sans-serif", // Optional: You can specify a font family
                    weight: "bold", // Optional: You can set the font weight
                  },
                  color: "#FFFFFF", // Change the font color of the legend labels to white
                },
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            rotation: 0,
          }}
        />
      </Box>
    </CardContent>
  </Card>
</Grid>


          {/* Stock Holdings Table */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#1E1E1E', color: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Stock Holdings
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#FFFFFF' }}>Ticker</TableCell>
                      <TableCell sx={{ color: '#FFFFFF' }}>Quantity</TableCell>
                      <TableCell sx={{ color: '#FFFFFF' }}>Buy Price</TableCell>
                      <TableCell sx={{ color: '#FFFFFF' }}>Current Price</TableCell>
                      <TableCell sx={{ color: '#FFFFFF' }}>Gain/Loss</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metrics.stockHoldings.map((stock, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: '#FFFFFF' }}>{stock.ticker}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>{stock.quantity}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>${stock.buyPrice.toFixed(2)}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>${stock.currentPrice.toFixed(2)}</TableCell>
                        <TableCell 
                          sx={{
                            color: stock.gainLoss >= 0 ? 'green' : 'red', // Green for gain, red for loss
                            fontWeight: 'bold',
                          }}
                        >
                          ${stock.gainLoss.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
