import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Snackbar, Alert } from "@mui/material";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import DropDown from "../../../Enterprise/Components/DropDown";

function Document(props) {
  const [tableRowData, setTableRowData] = useState([
    {
      id: "1",
      backupName: "Eaxee docs",
      backupDateAndTime: "2024/02/15 05:04:19",
      backupBy: "Hajra",
    },
    {
      id: "2",
      backupName: "Eaxee docs 1",
      backupDateAndTime: "2024/02/16 05:04:19",
      backupBy: "Iman",
    },
    {
      id: "3",
      backupName: "Eaxee docs 2",
      backupDateAndTime: "2024/02/17 05:04:19",
      backupBy: "Musaffara",
    },
    {
      id: "4",
      backupName: "Eaxee docs 3",
      backupDateAndTime: "2024/02/18 05:04:19",
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

  return (
    <Box sx={{ height: "calc(100vh - 100px - 8%)" }}>
      <Box sx={{ margin: "5px", padding: "5px", display: "flex", }}>
        <DropDown menuItems={firstdropdownitems} selectedValue={selectedValue} // Pass the current selected value
          onValueChange={handleValueChange} />
        <Box sx={{ position: "relative", left: "5px" }}>
          <CustomButton
            title="Extract"
            variant="outlined"
            Theme={props.theme}
            onClick={handleBackupClick}
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
