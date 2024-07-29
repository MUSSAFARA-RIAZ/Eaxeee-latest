import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Snackbar, Alert } from "@mui/material";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";

function Document(props) {
  const [tableRowData, setTableRowData] = useState([
    {
      id: "1",
      backupName: "Eaxee process",
      backupDateAndTime: "2024/02/15 05:04:19",
      backupBy: "Hajra",
    },
    {
      id: "2",
      backupName: "Eaxee process 1",
      backupDateAndTime: "2024/02/16 05:04:19",
      backupBy: "Iman",
    },
    {
      id: "3",
      backupName: "Eaxee process 2",
      backupDateAndTime: "2024/02/17 05:04:19",
      backupBy: "Musaffara",
    },
    {
      id: "4",
      backupName: "Eaxee process 3",
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
    setSnackBarMessage('Processes deleted successfully!');
    setSnackBarOpen(true);
  };

  return (
    <Box sx={{ height: "calc(100vh - 100px - 8%)" }}>
      <Box sx={{ margin: "5px", padding: "5px" }}>
        <CustomTable
          rows={tableRowData}
          columns={[
            { field: "id", headerName: "ID", flex: 1, hide: true },
            { field: "backupName", headerName: "Backup Name", flex: 1 },
            {
              field: "backupDateAndTime",
              headerName: "Backup Date and Time",
              flex: 1,
            },
            { field: "backupBy", headerName: "Backup By", flex: 1 },
          ]}
          rowsPerPage={10}
          pageSize={100}
          checkBoxSelection={false}
          showDeleteButton={true}
          showRestoreButton={true}
        >
          <CustomButton
            title="Create Backup"
            variant="outlined"
            Theme={props.theme}
            onClick={handleBackupClick}
          />
          <CustomButton
            title="Delete"
            variant="outlined"
            Theme={props.theme}
            onClick={handleDeleteClick}
          />
        </CustomTable>
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
