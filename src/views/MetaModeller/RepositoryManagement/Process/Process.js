import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Snackbar, Alert } from "@mui/material";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
function Document(props) {
  const [tableRowData, setTableRowData] = useState([
    {
      id: "1",
      backupName: "Eaxee process",
      backedupAt: "2024/02/15 05:04:19",
      backupBy: "Hajra",
    },
    {
      id: "2",
      backupName: "Eaxee process 1",
      backedupAt: "2024/02/16 05:04:19",
      backupBy: "Iman",
    },
    {
      id: "3",
      backupName: "Eaxee process 2",
      backedupAt: "2024/02/17 05:04:19",
      backupBy: "Musaffara",
    },
    {
      id: "4",
      backupName: "Eaxee process 3",
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
    setSnackBarMessage('Processes deleted successfully!');
    setSnackBarOpen(true);
  };

  return (
    <Box sx={{ height: "calc(100vh - 100px - 8%)" }}>
      <Box sx={{ margin: "5px", padding: "5px" }}>
        <CustomTable
          rows={tableRowData}
          columns={[
            { field: "id", headerName: props.language==="en"? "ID": AdminTranslation["ID"], flex: 1, hide: true },
            { field: "backupName", headerName: props.language==="en"? "Backup Name": AdminTranslation["Backup Name"], flex: 1 },
            {
              field: "backedupAt",
              headerName: props.language==="en"? "BackedupAt":AdminTranslation["backedupAt"],
              flex: 1,
            },
            { field: "backupBy", headerName: props.language==="en"? "Backup By":AdminTranslation["Backup By"], flex: 1 },
          ]}
          //rowsPerPage={10}
         // pageSize={100}
          checkBoxSelection={false}
          showDeleteButton={true}
          showRestoreButton={true}
        >
           <Box sx={{
                display: "flex", justifyContent: "space-between", alignItems: "space-between", width: "235px", ...(props.language === 'ar' && {
                  display: "flex", width: "200px", justifyContent: "space-between", position: "relative", right: "10px"
                })
              }}>
          <CustomButton
            title= {props.language === 'en' ? 'Create Backup' : AdminTranslation["Create Backup"]}
            variant="outlined"
            Theme={props.theme}
            // onClick={handleAddBackupClick}
          />
          <CustomButton
          
            title= {props.language === 'en' ? 'Delete' : AdminTranslation["Delete"]}
            variant="outlined"
            Theme={props.theme}
            onClick={handleDeleteClick}
          />
          </Box>
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
