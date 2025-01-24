import { styled } from "@mui/system";
import { Link } from "react-router-dom";

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

export default StyledLink;
