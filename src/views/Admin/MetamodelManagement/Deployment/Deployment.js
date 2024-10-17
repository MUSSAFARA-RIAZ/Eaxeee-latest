import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Button } from "@mui/material";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";
// import styles from "./Restore.RepositoryManagement.css";
import ModalAddBackup from "../Modals/ModalAddBackup";
import ModalDelete from "../Modals/ModalDelete";
// import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";

function Deployment(props) {
  const [openModal, setOpenModal] = useState(false);
  const [opendeleteModal, setdeleteOpenModal] = useState(false);
  const [tableRowData, setTableRowData] = useState([
    {
      id: "1",
      metamodelId: "EAXEEMM_ARC_01",
      metamodelName: "archimate_metamodel",
      publishedBy: "Framework",
      publishedOn: "2024-10-02 13:39:28",
      deployedBy: "admin@eaxee.com",
      deployedOn: "2024-10-05 12:42:37",
      status: "UNDEPLOYED",
      version: "v1",
    },
    {
      id: "2",
      metamodelId: "EAXEEMM_TOG_01",
      metamodelName: "togaf_metamodel",
      publishedBy: "Framework",
      publishedOn: "2024-10-08 08:37:58",
      deployedBy: "admin@eaxee.com",
      deployedOn: "2024-10-08 08:38:56",
      status: "DEPLOYED",
      version: "v1",
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
      backupDateAndTime: new Date().toISOString(),
      architectureName: "New Architecture",
      backupBy: "User",
    };
    setTableRowData([...tableRowData, newBackup]);
  };

  // const columns = [
  //   { field: "id", headerName: "ID", flex: 1, hide: true },
  //   { field: "backupName", headerName: "Backup Name", flex: 1 },
  //   { field: "backupDateAndTime", headerName: "Backup Date and Time", flex: 1 },
  //   { field: "architectureName", headerName: "Architecture Name", flex: 1 },
  //   { field: "backupBy", headerName: "Backup By", flex: 1 },
  // ];
  const handleDeleteClick = () => {
    setdeleteOpenModal(true);
  };

  const handledeleteCloseModal = () => {
    setdeleteOpenModal(false);
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    { field: "metamodelId", headerName: "Metamodel Id", flex: 1 },
    { field: "metamodelName", headerName: "Metamodel Name", flex: 1 },
    { field: "publishedBy", headerName: "Published By", flex: 1 },
    { field: "publishedOn", headerName: "Published On", flex: 1 },
    { field: "deployedBy", headerName: "Deployed By", flex: 1 },
    { field: "deployedOn", headerName: "Deployed On", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "version", headerName: "Version", flex: 1 },
  ];
  

  return (
    <Box
      // className={styles.restoreMain}
      sx={{ height: "calc(100vh - 100px - 8%)" }}
    >
      <Box
        // className={styles.retoreTableDiv}
        sx={{ margin: "5px", padding: "5px" }}
      >
       
        <CustomTable
          rows={tableRowData}
          columns={columns}
         
          //rowsPerPage={5}
         // pageSize={25}
          checkBoxSelection={false}
        
        >
         
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

export default connect(mapStateToProps)(Deployment);
