import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import "highlight.js/styles/github.css"; // Or any other style you prefer

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>(""); // The user's input
  const [chatHistory, setChatHistory] = useState<Message[]>([]); // Array of chat messages
  const chatEndRef = useRef<HTMLDivElement>(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleSendMessage = async () => {
    if (!inputMessage) return;

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { sender: "user", text: inputMessage },
    ]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: inputMessage,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: "bot", text: botReply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInputMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        <strong>CHATBOT</strong>
      </Typography>
      <Paper sx={{ height: "60vh", overflow: "auto", p: 2, mb: 2 }}>
        {chatHistory.map((msg, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: msg.sender === "user" ? "row-reverse" : "row",
            }}
          >
            <Box
              sx={{
                maxWidth: "90%",
                padding: "8px 12px",
                borderRadius: "12px",
                backgroundColor: msg.sender === "user" ? "#e3f2fd" : "#f1f8e9",
                wordBreak: "break-word",
              }}
            >
              <Typography>
                <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>
                {msg.text}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={chatEndRef} />
      </Paper>

      <TextField
        fullWidth
        label="Type a message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Container>
  );
};

export default Chatbot;
