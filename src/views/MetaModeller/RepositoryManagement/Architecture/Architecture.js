import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Button } from "@mui/material";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";
// import styles from "./Restore.RepositoryManagement.css";
import ModalAddBackup from "../Modals/ModalAddBackup";
import ModalDelete from "../Modals/ModalDelete";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";

function Architecture(props) {
  const [openModal, setOpenModal] = useState(false);
  const [opendeleteModal, setdeleteOpenModal] = useState(false);
  const [tableRowData, setTableRowData] = useState([
    {
      id: "1",
      backupName: "Eaxee backup",
      backedupAt: "2024/02/15 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Mahnoor",
    },
    {
      id: "2",
      backupName: "Eaxee backup 1",
      backedupAt: "2024/02/16 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Iman",
    },
    {
      id: "3",
      backupName: "Eaxee backup 2",
      backedupAt: "2024/02/17 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Musaffara",
    },
    {
      id: "4",
      backupName: "Eaxee backup 3",
      backedupAt: "2024/02/18 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Mahnoor",
    },
    {
      id: "5",
      backupName: "Eaxee backup 4",
      backedupAt: "2024/02/20 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Maheen",
    },
  ]);

  const handleAddBackupClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddBackup = (backupName) => {
    const newBackup = {
      id: (tableRowData.length + 1).toString(),
      backupName: backupName,
      backedupAt: new Date().toISOString(),
      architectureName: "New Architecture",
      backupBy: "User",
    };
    setTableRowData([...tableRowData, newBackup]);
  };

  // const columns = [
  //   { field: "id", headerName: "ID", flex: 1, hide: true },
  //   { field: "backupName", headerName: "Backup Name", flex: 1 },
  //   { field: "backedupAt", headerName: "backedupAt", flex: 1 },
  //   { field: "architectureName", headerName: "Architecture Name", flex: 1 },
  //   { field: "backupBy", headerName: "Backup By", flex: 1 },
  // ];
  const handleDeleteClick = () => {
    setdeleteOpenModal(true);
  };

  const handledeleteCloseModal = () => {
    setdeleteOpenModal(false);
  };

  return (
    <Box
      // className={styles.restoreMain}
      sx={{ height: "calc(100vh - 100px - 8%)" }}
    >
      <Box
        // className={styles.retoreTableDiv}
        sx={{ margin: "5px", padding: "5px" }}
      >
        <ModalAddBackup
          open={openModal}
          handleClose={handleCloseModal}
          onAddBackup={handleAddBackup}
        />
        <ModalDelete open={opendeleteModal} handleClose={handledeleteCloseModal} />
        <CustomTable
          rows={tableRowData}
          //  columns={[
          //   { field: "id", headerName: props.language==="en"? "ID": AdminTranslation["ID"], flex: 1, hide: true },
          //   { field: "backupName", headerName: props.language==="en"? "Backup Name": AdminTranslation["Backup Name"], flex: 1 },
          //   {
          //     field: "backedupAt",
          //     headerName: props.language==="en"? "BackedupAt":AdminTranslation["backedupAt"],
          //     flex: 1,
          //   },
          //   { field: "backupBy", headerName: props.language==="en"? "Backup By":AdminTranslation["Backup By"], flex: 1 },
          // ]}
          columns={[
            { field: "id", headerName:props.language==="en"? "ID": AdminTranslation["ID"], flex: 1, hide: true },
            { field: "backupName", headerName: props.language==="en"? "Backup Name": AdminTranslation["Backup Name"], flex: 1 },
            {
              field: "architectureName",
              headerName:props.language==="en"? "Architecture":AdminTranslation["Architecture"],
              flex: 1,
            },
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
            onClick={handleAddBackupClick}
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
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(Architecture);
