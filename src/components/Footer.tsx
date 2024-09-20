import { Typography } from "@mui/material";
import React from "react";

interface FooterProps {
  // Add any custom props you need here
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer
      style={{
        backgroundColor: "black",
        overflow: "hidden",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <p></p>
      <Typography
        style={{
          color: "white",
          textAlign: "center",
          padding: "5px 0px",
          fontSize: 15,
        }}
      >
        &copy; {new Date().getFullYear()} All Rights Reserved by CHATBOT
      </Typography>
    </footer>
  );
};

export default Footer;
