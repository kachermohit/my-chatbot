import { Typography } from "@mui/material";
import React from "react";

interface HeaderProps {
  // Add any custom props you need here
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header
      style={{
        backgroundColor: "black",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        width: "100%",
      }}
    >
      <Typography
        style={{ color: "white", padding: "10px 15px", fontSize: 20 }}
      >
        CHAT BOT
      </Typography>
    </header>
  );
};

export default Header;
