import React, { useState } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import {
  Grid,
  Box,
  IconButton,
  Typography,
  SpeedDialIcon,
  SpeedDial,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import LeftPaneMessenger from "./Messenger/LeftPane";
import RightPaneMessenger from "./Messenger/RightPane";

export default function Messenger({ props }) {
  const [open, setOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const titleBgColor = props.theme === "default" ? "#cecece" : "#181818";
  const bodyBgColor = props.theme === "default" ? "#cecece" : "#181818";
  const bodyRightBgColor = props.theme === "default" ? "#e0e0e0" : "#212121";
  const textColor = props.theme === "default" ? "#393a3a" : "#cecece";

  const handleSelectedChatChange = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <Box sx={{ height: "100vh", width: "100%", position: "relative" }}>
      <SpeedDial
        ariaLabel="Messenger"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 25,
          "& .MuiFab-root": {
            bgcolor: props.theme === "default" ? "#2158a4" : "#cecece",
            "&:hover": {
              bgcolor: props.theme === "default" ? "#2158a4" : "#a5d149",
            },
          },
        }}
        icon={<SpeedDialIcon openIcon={<ChatIcon />} icon={<ForumIcon />} />}
        direction="up"
        FabProps={{
          size: "small",
          onClick: () => setOpen(!open),
        }}
      />
      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: 72,
            right: 16,
            width: 550,
            boxShadow: 1,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              bgcolor: titleBgColor,
              color: textColor,
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: { textColor } }}
              variant="h6"
              component="div"
            >
              Messenger
            </Typography>
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              sx={{ color: "#cecece" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              bgcolor: bodyBgColor,
              p: 0,
              height: 350,
              overflowY: "auto",
              display: "flex",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={4}
                sx={{
                  bgcolor: bodyBgColor,
                }}
              >
                <LeftPaneMessenger
                  props={props}
                  onSelectedChatChange={handleSelectedChatChange}
                />
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  bgcolor: bodyRightBgColor,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: "15px 15px 0 0",
                }}
              >
                <RightPaneMessenger props={props} selectedChat={selectedChat} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}
