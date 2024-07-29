import AttachFileIcon from "@mui/icons-material/AttachFile";
import { InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import React, { useState } from "react";

import { Box, IconButton, Typography } from "@mui/material";

export default function RightPane({ props,selectedChat}) {

  const bodyRightBgColor = props.theme === "default" ? "#e0e0e0" : "#212121";
  const textColor = props.theme === "default" ? "#393a3a" : "#cecece";

  const [message, setMessage] = useState("");
  const messages = [
    { text: "Hello! How are you?", isFromCurrentUser: false },
    { text: "I'm good, thanks! How about you?", isFromCurrentUser: true },
    {
      text: "I'm doing well, just working on some projects.",
      isFromCurrentUser: false,
    },
  ];
  const handleSendMessage = () => {
    console.log("Send message:", message);
    setMessage("");
  };
  return (
    <>
      {" "}
      <Typography
        sx={{ mt: 0.5, ml: 1.5 }}
        variant="h6"
        component="div"
        color={textColor}
      >
        {selectedChat ? ` ${selectedChat}` : "Chat"}
      </Typography>
      <Box
        sx={{
          bgcolor: bodyRightBgColor,
          p: 2,
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selectedChat ? (
          <Box sx={{ flexGrow: 1 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: msg.isFromCurrentUser ? "row-reverse" : "row",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    bgcolor: msg.isFromCurrentUser ? (props.theme === "default" ?"rgba(33,88, 164, 0.2)":"rgba(165,209, 73, 0.7)") : "#cecece",
                    color: "#000",
                    p: 1,
                    borderRadius: msg.isFromCurrentUser ?'10px 0px 10px 10px':'0px 10px 10px 10px',
                    maxWidth: "70%",
                    alignSelf: "center",
                    ml: msg.isFromCurrentUser ? 1 : 0,
                    mr: msg.isFromCurrentUser ? 0 : 1,
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color={textColor}>
            Select a user or group to start chatting.
          </Typography>
        )}
      </Box>
      {selectedChat && (
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            p: "1px 4px",
            mb: 1,
            ml: 1.5,
            justifyContent: "center",
            borderRadius: 5,
            width: "93%",
            boxShadow: "none",
            bgcolor: props.theme === "dark" ? "#0a0a0a" : "#cecece",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="emoji">
            <EmojiEmotionsIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Start typing..."
            inputProps={{ "aria-label": "start typing" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton sx={{ p: "10px" }} aria-label="attach file">
            <AttachFileIcon />
          </IconButton>
          <IconButton
            sx={{ p: "10px" }}
            aria-label="send"
            onClick={handleSendMessage}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      )}
    </>
  );
}
