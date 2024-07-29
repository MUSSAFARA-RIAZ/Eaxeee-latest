import React, { useState } from "react";
import CustomTabs from "../../../../components/CustomTabs/CustomTabs";
import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  AvatarGroup,
  Badge,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModalCreateGroup from "../Modals/ModalCreateGroup";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function LeftPane({ props, onSelectedChatChange }) {
  const textColor = props.theme === "default" ? "#393a3a" : "#cecece";
  const [selectedChat, setSelectedChat] = useState(null);
  const tabs = [{ label: "Users" }, { label: "Groups" }];
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedChat(null); // Clear selected chat when tab changes
  };

  const handleUserClick = (user) => {
    setSelectedChat(user.name);
    if (onSelectedChatChange) {
      onSelectedChatChange(user.name);
    }
  };

  const handleGroupClick = (group) => {
    setSelectedChat(group.name);
    if (onSelectedChatChange) {
      onSelectedChatChange(group.name);
    }
  };

  const activeUsers = [
    { name: "User 1", avatar: "/path/to/avatar1.jpg" },
    { name: "User 2", avatar: "/path/to/avatar2.jpg" },
    { name: "User 3", avatar: "/path/to/avatar1.jpg" },
    { name: "User 4", avatar: "/path/to/avatar2.jpg" },
  ];

  const nonActiveUsers = [
    { name: "User 5", avatar: "/path/to/avatar1.jpg" },
    { name: "User 6", avatar: "/path/to/avatar2.jpg" },
    { name: "User 7", avatar: "/path/to/avatar1.jpg" },
    { name: "User 8", avatar: "/path/to/avatar2.jpg" },
  ];

  const groups = [
    { name: "Group 1", avatar: "/path/to/group1.jpg" },
    { name: "Group 2", avatar: "/path/to/group2.jpg" },
  ];

  const [openNewGroupModal, setOpenNewGroupModal] = useState(false);

  const handleOpenNewGroupModal = () => {
    setOpenNewGroupModal(true);
  };

  const handleCloseNewGroupModal = () => {
    setOpenNewGroupModal(false);
  };

  return (
    <Box
      sx={{
        height: 350,
        overflow: "hidden", // Ensure overflow is hidden on the container
      }}
    >
      <ModalCreateGroup
        open={openNewGroupModal}
        handleClose={handleCloseNewGroupModal}
      />
      <Box sx={{paddingLeft:1}}>
      <CustomTabs
        value={tabValue}
        onChange={handleTabChange}
        tabs={tabs}
        orientation="horizontal"
        language={props.language}
        theme={props.theme}
      />
      </Box>
      <Box
        sx={{
          height: `calc(100% - 48px)`, // Adjust this height based on the height of the tabs
          overflowY: "auto",
          paddingRight: 1,
          paddingLeft: 1,
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          "&::-webkit-scrollbar-track": {
            background:
              props.theme === "default"
                ? "#cecece"
                : props.theme === "light"
                ? "#eff3f7"
                : "#212121",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: props.theme === "default" ? "#2158a4" : "#a5d149",
            borderRadius: "10px",
          },
        }}
      >
        {tabValue === 0 && (
          <List>
            {activeUsers.map((user, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleUserClick(user)}
                sx={{
                  backgroundColor:
                    selectedChat === user.name
                      ? props.theme === "dark"
                        ? "rgba(165,209, 73, 0.3)"
                        : "rgba(33,88, 164, 0.2)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor:
                      props.theme === "dark"
                        ? "rgba(165,209, 73, 0.2)"
                        : "rgba(33,88, 164, 0.1)",
                  },
                  borderRadius: 1,
                  marginY:0.5
                }}
              >
                <ListItemAvatar>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                  >
                    <Avatar src={user.avatar} />
                  </StyledBadge>
                </ListItemAvatar>
                <Typography variant="body2" color={textColor}>
                  {user.name}
                </Typography>
              </ListItem>
            ))}
            {nonActiveUsers.map((user, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleUserClick(user)}
                sx={{
                  backgroundColor:
                    selectedChat === user.name
                      ? props.theme === "dark"
                        ? "rgba(165,209, 73, 0.3)"
                        : "rgba(33,88, 164, 0.2)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor:
                      props.theme === "dark"
                        ? "rgba(165,209, 73, 0.2)"
                        : "rgba(33,88, 164, 0.1)",
                  },
                  borderRadius: 1,
                  marginY:0.5
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>
                <Typography variant="body2" color={textColor}>
                  {user.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
        {tabValue === 1 && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: -2,
              }}
            >
              <Tooltip title="Create Group">
                <IconButton size="small" onClick={handleOpenNewGroupModal}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <List>
              {groups.map((group, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleGroupClick(group)}
                  sx={{
                    backgroundColor:
                      selectedChat === group.name
                        ? props.theme === "dark"
                          ? "rgba(165,209, 73, 0.3)"
                          : "rgba(33,88, 164, 0.2)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        props.theme === "dark"
                          ? "rgba(165,209, 73, 0.2)"
                          : "rgba(33,88, 164, 0.1)",
                    },
                    borderRadius: 1,
                    marginY:0.5
                  }}
                >
                  <ListItemAvatar>
                    <AvatarGroup max={2}>
                      {activeUsers.map((user, userIndex) => (
                        <Avatar
                          key={userIndex}
                          sx={{ width: 24, height: 24 }}
                          src={user.avatar}
                        />
                      ))}
                    </AvatarGroup>
                  </ListItemAvatar>
                  <Typography sx={{ pl: 0.5 }} variant="body2" color={textColor}>
                    {group.name}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
}
