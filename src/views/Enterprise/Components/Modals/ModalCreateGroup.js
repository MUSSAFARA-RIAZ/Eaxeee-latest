import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { connect } from "react-redux";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
import CloseIcon from "@mui/icons-material/Close";

const ModalNewGroup = ({ open, handleClose, language, theme }) => {
  const [snackBarFlag, setSnackBarFlag] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("");

  const handleSnackBarClose = () => {
    setSnackBarFlag(false);
  };

  const handleAddClick = () => {
    setSnackBarFlag(true);
    handleClose();
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  const updatedRows = [
    { id: "1", user: "admin" },
    { id: "2", user: "hammad" },
    { id: "3", user: "ghazni" },
    { id: "4", user: "user2" },
    { id: "5", user: "user3" },
    { id: "6", user: "Mahnoor" },
    { id: "7", user: "Mussaffra" },
    { id: "8", user: "user1" },
    { id: "9", user: "maheen" },
    { id: "10", user: "monir" },
  ];

  const columns = [
    {
      field: "user",
      headerName: language === "en" ? "Users" : AdminTranslation["Users"],
      flex: 1,
    },
  ];

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            width: "500px",
            height: "500px",
            maxWidth: "90%",
            "& ::-webkit-scrollbar": {
            width: "5px",
          },
          "& ::-webkit-scrollbar-track": {
            background:
              theme === "default"
                ? "#cecece"
                : theme === "light"
                ? "#eff3f7"
                : "#212121",
            borderRadius: "10px",
          },
          "& ::-webkit-scrollbar-thumb": {
            background:
              theme === "default"
                ? "#2158a4"
                : theme === "light"
                ? "#cbd0d7"
                : "#a5d149",
            borderRadius: "10px",
          },
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor:
              theme === "default"
                ? "#2158a4"
                : theme === "light"
                ? "#cbd0d7"
                : "#393a3a",
            color: "#cecece",
            padding: "6px",
            paddingLeft: "35px",
            position: "relative",
          }}
        >
          {language === "en" ? "New Group" : AdminTranslation["New Group"]}
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "#cecece",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor:
              theme === "default"
                ? "#cecece"
                : theme === "dark"
                ? "#212121"
                : "#ffffff",
            color:
              theme === "default"
                ? "#414849"
                : theme === "light"
                ? "#414849"
                : "#cecece",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <TextField
              fullWidth
              label={
                language === "en"
                  ? "Group Name"
                  : AdminTranslation["Group Name"]
              }
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>
                {language === "en"
                  ? "Group Type"
                  : AdminTranslation["Group Type"]}
              </InputLabel>
              <Select
                value={groupType}
                onChange={(e) => setGroupType(e.target.value)}
                label={
                  language === "en"
                    ? "Group Type"
                    : AdminTranslation["Group Type"]
                }
              >
                <MenuItem value="Normal">
                  {language === "en" ? "Normal" : AdminTranslation["Normal"]}
                </MenuItem>
                <MenuItem value="Broadcast">
                  {language === "en" ? "Broadcast" : AdminTranslation["Broadcast"]}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box style={{ paddingTop: "23px",'& .MuiDataGrid-footerContainer': {
                 display:"none"
              } }}>
            <CustomTable
              rows={updatedRows}
              columns={columns}
              Theme={theme}
              checkboxSelection={true}
              disablePagination={true}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor:
              theme === "default"
                ? "#cecece"
                : theme === "dark"
                ? "#212121"
                : "#ffffff",
            mt: -3,
            pt: 3,
          }}
        >
          <CustomButton
            title={language === "en" ? "Add" : AdminTranslation["Add"]}
            type="submit"
            Theme={theme}
            onClick={handleAddClick}
          />
          <CustomButton
            title={language === "en" ? "Cancel" : AdminTranslation["Cancel"]}
            type="button"
            Theme={theme}
            onClick={handleClose}
          />
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBarFlag}
        autoHideDuration={1500}
        onClose={handleSnackBarClose}
      >
        <Alert severity="success">Group created successfully!</Alert>
      </Snackbar>
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewGroup);
