import React, { useState } from "react";
import {
  Box,
  Stack,
  Modal,
  TextField,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./../UserManagement.module.css";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";

const ModalUserImport = ({ open, handleClose, language, theme }) => {
  const handleModalImportButton = () => {
    console.log("Import button clicked");
  };
  const handleModalCancelButton = () => {
    console.log("Cancel button clicked");
    handleClose();
  };

  const searchButtonAction = () => {};

  const directoryUsers = [
    "User 1",
    "User 2",
    "User 3",
    "User 4",
    "User 5",
    "User 6",
    "User 7",
    "User 8",
    "User 9",
    "User 10",
    "User 11",
  ];

  const [selectedDirectoryUsers, setSelectedDirectoryUsers] = useState([]);
  const [isAllDirectoryUsersSelected, setIsAllDirectoryUsersSelected] =
    useState(false); // New state variable

  const handleSelectAllDirectoryUsers = () => {
    const allSelected = !selectedDirectoryUsers.length; // Check if all users are currently selected
    const updatedSelectedUsers = directoryUsers.map((user) => user); // Copy the user list

    if (allSelected) {
      // If all are not selected, select all users
      setSelectedDirectoryUsers(updatedSelectedUsers);
    } else {
      // If all are selected, deselect all users
      setSelectedDirectoryUsers([]);
    }

    // Update isAllDirectoryUsersSelected based on the new selection state
    setIsAllDirectoryUsersSelected(allSelected);
  };

  const handleCheckboxChangeDirectoryUsers = (user) => {
    setSelectedDirectoryUsers((prevSelected) => {
      if (prevSelected.includes(user)) {
        return prevSelected.filter((selectedUser) => selectedUser !== user);
      } else {
        return [...prevSelected, user];
      }
    });
  };

  const directorySecurityGroups = [
    "Group 1",
    "Group 2",
    "Group 3",
    "Group 4",
    "Group 5",
    "Group 6",
    "Group 7",
    "Group 8",
    "Group 9",
    "Group 10",
    "Group 11",
  ];

  const [selectedDirectorySecurityGroups, setSelectedDirectorySecurityGroups] =
    useState([]);
  const [
    isAllDirectorySecurityGroupsSelected,
    setIsAllDirectorySecurityGroupsSelected,
  ] = useState(false); // New state variable

  const handleSelectAllDirectorySecurityGroups = () => {
    const allSelected = !selectedDirectorySecurityGroups.length; // Check if all groups are currently selected
    const updatedSelectedSecurityGroups = directorySecurityGroups.map(
      (user) => user
    ); // Copy the group list

    if (allSelected) {
      // If all are not selected, select all users
      setSelectedDirectorySecurityGroups(updatedSelectedSecurityGroups);
    } else {
      // If all are selected, deselect all users
      setSelectedDirectorySecurityGroups([]);
    }

    // Update isAllDirectoryUsersSelected based on the new selection state
    setIsAllDirectorySecurityGroupsSelected(allSelected);
  };

  const handleCheckboxChangeDirectorySecurityGroups = (user) => {
    setSelectedDirectorySecurityGroups((prevSelected) => {
      if (prevSelected.includes(user)) {
        return prevSelected.filter((selectedUser) => selectedUser !== user);
      } else {
        return [...prevSelected, user];
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          onClick: (e) => e.stopPropagation(),
        },
      }}
    >
      <Box
        className={styles.activeDirModalBox}
        sx={{
          backgroundColor:
            theme === "default"
              ? "#dff7fa"
              : theme === "light"
              ? "#ffffff"
              : "#212121",
        }}
      >
        <Box
          // className={styles.activeDirModalHeader}
          sx={{
            backgroundColor:
              theme === "default"
                ? "#0d7e8a"
                : theme === "light"
                ? "#cbd0d7"
                : "#CCCCCC",
            color:
              theme === "default"
                ? "#ffffff"
                : theme === "light"
                ? "#4A4A4A"
                : "#181818",
            padding: "1px 20px",
          }}
        >
          <IconButton
            className={styles.closeButton}
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h1"
            sx={{
              m: 1,
              fontWeight: "bold",
              fontSize: "large",
            }}
          >
            {language === "en"
              ? "Import Users From Directory"
              : AdminTranslation["Import Users From Active Directory"]}
          </Typography>
        </Box>

        <form className={styles.activeDirModalForm}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              margin: "15px 0",
              color:
                theme === "default"
                  ? "#0d7e8a"
                  : theme === "light"
                  ? "#4A4A4A"
                  : "#CCCCCC",
              fontSize: "large",
            }}
          >
            {language === "en"
              ? "Server Settings"
              : AdminTranslation["Server Settings"]}
          </Typography>

          {/* Row 1: Hostname, Port, BaseDN */}
          <Box
            className={styles.activeDirModalTextFields}
            // sx={{ display: 'flex', gap: '10px', alignItems: 'centre'}}
          >
            <TextField
              label={
                language === "en" ? "Hostname" : AdminTranslation["Hostname"]
              }
              fullWidth
              margin="normal"
              size="small"
            />
            <TextField
              label={language === "en" ? "Port" : AdminTranslation["Port"]}
              fullWidth
              margin="normal"
              size="small"
            />
            <TextField
              label={
                language === "en" ? "Base DN" : AdminTranslation["Base DN"]
              }
              fullWidth
              margin="normal"
              size="small"
            />
          </Box>

          {/* Row 2: Username, Password, Save Password Checkbox */}
          <Box
            className={styles.activeDirModalTextFields}
            // sx={{ display: 'flex', gap: '10px', alignItems: 'centre'}}
          >
            <TextField
              label={
                language === "en" ? "Username" : AdminTranslation["Username"]
              }
              fullWidth
              margin="normal"
              size="small"
            />
            <TextField
              label={
                language === "en" ? "Password" : AdminTranslation["Password"]
              }
              type="password"
              fullWidth
              margin="normal"
              size="small"
            />
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    color:
                      theme === "default"
                        ? "#0d7e8a"
                        : theme === "light"
                        ? "#4A4A4A"
                        : "#CCCCCC",
                  }}
                />
              }
              label={
                language === "en"
                  ? "Save Password"
                  : AdminTranslation["Save Password"]
              }
            />
          </Box>

          {/* Row 3: User Filter, Group Filter, Search Button */}
          <Box
            className={styles.activeDirModalTextFields}
          >
            <TextField
              label={
                language === "en"
                  ? "User Filter"
                  : AdminTranslation["User Filter"]
              }
              fullWidth
              margin="normal"
              size="small"
            />
            <TextField
              label={
                language === "en"
                  ? "Group Filter"
                  : AdminTranslation["Group Filter"]
              }
              fullWidth
              margin="normal"
              size="small"
            />
            <CustomButton
              className={styles.activeDirSearchButton}
              title={language === "en" ? "Search" : AdminTranslation["Search"]}
              variant="outlined"
              Theme={theme}
              onClick={searchButtonAction}
              type="submit"
              fullWidth={true}
            />
          </Box>

          {/* Row 4: Directory users, Directory security group with SelectAll Icon button*/}
          <Box sx={{ display: "flex", gap: "15px", height: "220px" }}>
            <Box sx={{ width: "50%" }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    margin: "5px 0",
                    padding: "5px",
                    color: theme === "dark" ? "#ffffff" : "#414849",
                    fontSize: "medium",
                  }}
                >
                  {language === "en"
                    ? "Directory Users"
                    : AdminTranslation["Directory Users"]}
                </Typography>
                <Tooltip
                  title={
                    isAllDirectoryUsersSelected ? "Deselect All" : "Select All"
                  }
                  placement="left"
                >
                  <IconButton onClick={handleSelectAllDirectoryUsers}>
                    {/* Conditionally render icons */}
                    {isAllDirectoryUsersSelected ? (
                      <DeselectIcon
                        style={{
                          color:
                            theme === "default"
                              ? "#0d7e8a"
                              : theme === "light"
                              ? "#4A4A4A"
                              : "#ffffff",
                        }}
                      />
                    ) : (
                      <SelectAllIcon
                        style={{
                          color:
                            theme === "default"
                              ? "#0d7e8a"
                              : theme === "light"
                              ? "#4A4A4A"
                              : "#ffffff",
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
              <List
                className={`${styles.directoryUsersList}`}
                sx={{
                  marginBottom: "10px",
                  border:
                    theme === "dark"
                      ? "1px solid #515151"
                      : "1px solid #e0e0e0",
                  "&::-webkit-scrollbar": {
                    width: "7px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background:
                      theme === "default"
                        ? "#cceaed"
                        : theme === "light"
                        ? "#eff3f7"
                        : "#212121",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background:
                      theme === "default"
                        ? "#0d7e8a"
                        : theme === "light"
                        ? "#cbd0d7"
                        : "#181818",
                    borderRadius: "10px",
                  },
                }}
              >
                {directoryUsers.map((user, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      padding: "0 20px", // Adjust the padding to reduce the height
                    }}
                  >
                    <Checkbox
                      checked={selectedDirectoryUsers.includes(user)} // Check if user object exists in selectedDirectoryUsers
                      onChange={() => handleCheckboxChangeDirectoryUsers(user)}
                      style={{
                        height: 0 /* Adjust the height as needed */,
                        color:
                          theme === "default"
                            ? "#0d7e8a"
                            : theme === "light"
                            ? "#4A4A4A"
                            : "#CCCCCC",
                      }}
                      // Add logic to set the checked state based on your requirements
                    />
                    <ListItemText
                      primary={user}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        margin: "0 10px",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ width: "50%" }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    margin: "5px 0",
                    padding: "5px",
                    color: theme === "dark" ? "#ffffff" : "#414849",
                    fontSize: "medium",
                  }}
                >
                  {language === "en"
                    ? "Directory Security Groups"
                    : AdminTranslation["Directory Security Groups"]}
                </Typography>
                <Tooltip
                  title={
                    isAllDirectorySecurityGroupsSelected
                      ? "Deselect All"
                      : "Select All"
                  }
                  placement="left"
                >
                  <IconButton onClick={handleSelectAllDirectorySecurityGroups}>
                    {/* Conditionally render icons */}
                    {isAllDirectorySecurityGroupsSelected ? (
                      <DeselectIcon
                        style={{
                          color:
                            theme === "default"
                              ? "#0d7e8a"
                              : theme === "light"
                              ? "#4A4A4A"
                              : "#ffffff",
                        }}
                      />
                    ) : (
                      <SelectAllIcon
                        style={{
                          color:
                            theme === "default"
                              ? "#0d7e8a"
                              : theme === "light"
                              ? "#4A4A4A"
                              : "#ffffff",
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
              <List
                className={`${styles.directoryUsersList}`}
                sx={{
                  marginBottom: "10px",
                  border:
                    theme === "dark"
                      ? "1px solid #515151"
                      : "1px solid #e0e0e0",
                  "&::-webkit-scrollbar": {
                    width: "7px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background:
                      theme === "default"
                        ? "#cceaed"
                        : theme === "light"
                        ? "#eff3f7"
                        : "#212121",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background:
                      theme === "default"
                        ? "#0d7e8a"
                        : theme === "light"
                        ? "#cbd0d7"
                        : "#181818",
                    borderRadius: "10px",
                  },
                }}
              >
                {directorySecurityGroups.map((user, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      padding: "0 20px", // Adjust the padding to reduce the height
                    }}
                  >
                    <Checkbox
                      checked={selectedDirectorySecurityGroups.includes(user)}
                      onChange={() =>
                        handleCheckboxChangeDirectorySecurityGroups(user)
                      }
                      style={{
                        height: 0 /* Adjust the height as needed */,
                        color:
                          theme === "default"
                            ? "#0d7e8a"
                            : theme === "light"
                            ? "#4A4A4A"
                            : "#CCCCCC",
                      }}
                      // Add logic to set the checked state based on your requirements
                    />
                    <ListItemText
                      primary={user}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        margin: "0 10px",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </form>

        {/* Row 5: Import Button, Cancel Button */}
        <Box className={styles.activeDirModalFooter}>
          <CustomButton
            title={language === "en" ? "Import" : AdminTranslation["Import"]}
            Theme={theme}
            onClick={handleModalImportButton}
          />
          <CustomButton
            title={language === "en" ? "Cancel" : AdminTranslation["Cancel"]}
            Theme={theme}
            onClick={handleModalCancelButton}
          />
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (lang) => {
      return dispatch({
        type: "TOGGLELANG",
        value: lang === "en" ? "ar" : "en",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserImport);
