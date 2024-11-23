import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Button } from "@mui/material";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";
// import styles from "./Restore.RepositoryManagement.css";
import ModalAddBackup from "../Modals/ModalAddBackup";
import ModalDelete from "../Modals/ModalDelete";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
// import AdminTranslation from "../../../Utils/AdminTranslation/AdminTranslation";
function Repository(props) {
  const [openModal, setOpenModal] = useState(false);
  const [opendeleteModal, setdeleteOpenModal] = useState(false);
  const [tableRowData, setTableRowData] = useState([
    {
      id: "1",
      backupName: "Eaxee backup",
      MetamodelName: "Archimate",
      backupDateAndTime: "2024/02/15 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Mahnoor",
      version: "v1",
    },
    {
      id: "2",
      backupName: "Eaxee backup 1",
      MetamodelName: "Archimate",
      backupDateAndTime: "2024/02/16 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Iman",
      version: "v1",
    },
    {
      id: "3",
      backupName: "Eaxee backup 2",
      MetamodelName: "Archimate",
      backupDateAndTime: "2024/02/17 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Mussafara",
      version: "v1",
    },
    {
      id: "4",
      backupName: "Eaxee backup 3",
      MetamodelName: "Archimate",
      backupDateAndTime: "2024/02/18 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Mahnoor",
      version: "v1",
    },
    {
      id: "5",
      backupName: "Eaxee backup 4",
      MetamodelName: "Archimate",
      backupDateAndTime: "2024/02/20 05:04:19",
      architectureName: "Eaxee",
      backupBy: "Maheen",
      version: "v1",
    }
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

  const handleDeleteClick = () => {
    setdeleteOpenModal(true);
  };

  const handledeleteCloseModal = () => {
    setdeleteOpenModal(false);
  };

  const handleActionClick = (row) => {
    if (row.status === "DEPLOYED") {
      //   alert(`${row.metamodelName} is already deployed.`);
    } else {
      // Handle deployment logic here (e.g., update state or make an API call)
      const updatedRows = tableRowData.map((data) =>
        data.id === row.id ? { ...data, status: "DEPLOYED" } : data
      );
      setTableRowData(updatedRows);
      //   alert(`${row.metamodelName} has been deployed.`);
    }
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

          columns={[
            {
              field: "id",
              headerName: props.language === "en" ? "ID" : AdminTranslation["ID"],
              flex: 1,
              hide: true
            },
            {
              field: "MetamodelName",
              headerName: props.language === "en" ? "Metamodel Name" : AdminTranslation["Metamodel Name"],
              flex: 1
            },
            {
              field: "backupName",
              headerName: props.language === "en" ? "Backup Name" : AdminTranslation["Backup Name"],
              flex: 1
            },
            {
              field: "backupDateAndTime",
              headerName: props.language === "en" ? "Backup Date and Time" : AdminTranslation["Backup Date and Time"],
              flex: 1
            },
            {
              field: "backupBy",
              headerName: props.language === "en" ? "Backup By" : AdminTranslation["Backup By"],
              flex: 1
            },
            {
              field: "version",
              headerName: props.language === "en" ? "Version" : AdminTranslation["Version"],
              flex: 1
            },
            {
              field: "Action",
              headerName: props.language === "en" ? "Action" : AdminTranslation["Action"],
              flex: 1,
              renderCell: (params) => {
                const isDeployed = params.row.status === "DEPLOYED";
                return (
                  <CustomButton
                    title={isDeployed ? (props.language === "en" ? "Deployed" : AdminTranslation["Deployed"]) : (props.language === "en" ? "Deploy" : AdminTranslation["Deploy"])}
                    Theme="default"
                    onClick={() => handleActionClick(params.row)}
                  />
                );
              },
            },
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
              title={props.language === 'en' ? 'Create Backup' : AdminTranslation["Create Backup"]}
              variant="outlined"
              Theme={props.theme}
              onClick={handleAddBackupClick}
            />
            <CustomButton

              title={props.language === 'en' ? 'Delete' : AdminTranslation["Delete"]}
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

export default connect(mapStateToProps)(Repository);
