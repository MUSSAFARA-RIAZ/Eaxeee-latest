import React, { useState } from "react";
import { connect } from "react-redux";
// import { Box,} from "@mui/material";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import DropDown from "../../../Enterprise/Components/DropDown";

import {
  Box, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Typography, Snackbar, Alert
} from '@mui/material';

import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
function Document(props) {
  const [tableRowData, setTableRowData] = useState([
    {
      id: "1",
      backupName: "Eaxee docs",
      backedupAt: "2024/02/15 05:04:19",
      backupBy: "Hajra",
    },
    {
      id: "2",
      backupName: "Eaxee docs 1",
      backedupAt: "2024/02/16 05:04:19",
      backupBy: "Iman",
    },
    {
      id: "3",
      backupName: "Eaxee docs 2",
      backedupAt: "2024/02/17 05:04:19",
      backupBy: "Musaffara",
    },
    {
      id: "4",
      backupName: "Eaxee docs 3",
      backedupAt: "2024/02/18 05:04:19",
      backupBy: "Mahnoor",
    },
  ]);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const handleBackupClick = () => {
    setSnackBarMessage('Backup created successfully!');
    setSnackBarOpen(true);
  };

  const handleDeleteClick = () => {
    setSnackBarMessage('Documents deleted successfully!');
    setSnackBarOpen(true);
  };
  const firstdropdownitems = [
    { value: 10, label: 'Select Framework' },
    { value: 20, label: 'Archimate MetaModel' },
    { value: 30, label: 'Togaf MetaModel' },
  ];
  const [selectedValue, setSelectedValue] = React.useState(10); // Default to 10 ("None")

  // Handle value change in DropDown

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
  };
  const isRTL = props.language === "ar";
  const [role, setRole] = useState('');

  return (
    <Box sx={{ height: "calc(100vh - 100px - 8%)" }}>
      <Box sx={{ margin: "5px", padding: "5px", display: "flex", }}>
        {/* <DropDown menuItems={firstdropdownitems} selectedValue={selectedValue} // Pass the current selected value
          onValueChange={handleValueChange} /> */}
        <Box
          sx={{
            position: "relative",
            left: "5px",
            // border: "2px solid red",
            width: "400px",
            display: "flex",
            justifyContent: "space-between", // Adjust space between items
            alignItems: "center",           // Center items vertically
            padding: "10px",                // Optional padding
            gap: 2,                         // Optional gap between elements
          }}
        >
          <FormControl
            fullWidth
            sx={{
              marginTop: 0, // Ensure no extra margin pushes it down
            }}
          >
            <InputLabel
              id="pool-role-label"
              sx={{
                transformOrigin: isRTL ? "top right" : "top left",
                textAlign: isRTL ? "right" : "left",
                right: isRTL ? 24 : "auto",
                "&.Mui-focused": {
                  color: "dialogInputfield.main",
                },
                padding:"0px"
              }}
            >
              {props.language === "en"
                ? "Select Framework"
                : AdminTranslation["Select Framework"]}
            </InputLabel>
            <Select
              labelId="pool-role-label"
              id="pool-role"
              value={role}
              label={
                props.language === "en"
                  ? "Select Framework"
                  : AdminTranslation["Select Framework"]
              }
              onChange={(e) => setRole(e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  textAlign: isRTL ? "right" : "left",
                  color: "inputfieldTextColor.main",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  textAlign: isRTL ? "right" : "left",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "dialogInputfield.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "dialogInputfield.main",
                },
                "& .MuiSelect-icon": {
                  right: isRTL ? "unset" : 0,
                  left: isRTL ? 0 : "unset",
                },
                height:"53px"
              }}
            >
              <MenuItem value={"Archimate MetaModel"}>
                {props.language === "en"
                  ? "Archimate MetaModel"
                  : AdminTranslation["Archimate MetaModel"]}
              </MenuItem>
              <MenuItem value={"Togaf MetaModel"}>
                {props.language === "en"
                  ? "Togaf MetaModel"
                  : AdminTranslation["Togaf MetaModel"]}
              </MenuItem>
            </Select>
          </FormControl>

          <CustomButton
            title={props.language==="en"?"Extract":AdminTranslation["Extract"]}
            variant="outlined"
            Theme={props.theme}
            onClick={handleBackupClick}
            sx={{
              height: "fit-content", // Ensures the button's height matches
              alignSelf: "center",   // Centers the button relative to the parent
            }}
          />
        </Box>




      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBarOpen}
        autoHideDuration={1500}
        onClose={handleSnackBarClose}
      >
        <Alert severity="success">
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(Document);
