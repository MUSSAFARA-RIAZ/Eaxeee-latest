import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Box, IconButton, Typography,Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomTable from "../../../components/CustomTable/CustomTable";
import ModalAddPool from "./Modals/ModalAddPool";
import ModalAddLicensePool from "./Modals/ModalAddLicensePool";
import ModalAddUsersPool from "./Modals/ModalAddUsersPool";

function ConcurrentUser(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openLicenseModal, setOpenLicenseModal] = useState(false);
  const [openUsersModal, setOpenUsersModal] = useState(false); // New state for Users Modal
  const [selectedPool, setSelectedPool] = useState(null);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenLicenseModal = () => {
    setOpenLicenseModal(true);
  };

  const handleCloseLicenseModal = () => {
    setOpenLicenseModal(false);
  };

  const handleOpenUsersModal = () => {
    setOpenUsersModal(true); // Open Users Modal
  };

  const handleCloseUsersModal = () => {
    setOpenUsersModal(false); // Close Users Modal
  };

  const handleAddPoolClick = () => {
    setOpenModal(true);
  };

  const handleRowClick = (rowData) => {
    setSelectedPool(rowData.row);
  };

  const poolRowData = [
    {
      id: "1",
      name: "dea1",
      role: "Repository Admin",
      licenses: ["lisnxend47", "lisnxend1"],
      users: ["User1", "User2"],
    },
    {
      id: "2",
      name: "dea2",
      role: "Repository Admin",
      licenses: ["lisnxend43", "lisnxend122"],
      users: ["User3", "User4"],
    },
    {
      id: "3",
      name: "dea1",
      role: "Organization Portal",
      licenses: ["lisnxend5"],
      users: ["User5", "User6"],
    },
    {
      id: "4",
      name: "abc",
      role: "Architect",
      licenses: ["lisnxend29"],
      users: ["User7", "User8"],
    },
    {
      id: "5",
      name: "GM",
      role: "Repository Admin",
      licenses: ["lisnxend99", "lisnxend14"],
      users: ["User9", "User10"],
    },
    {
      id: "6",
      name: "xyz",
      role: "Repository Admin",
      licenses: ["lisnxend1", "lisnxend13"],
      users: ["User11", "User12"],
    },
  ];

  const poolColumns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
  ];

  const combinedTableRows = selectedPool
    ? selectedPool.licenses.map((license, index) => ({
        id: `license-${index}`,
        licenses: license,
        users: selectedPool.users[index],
      }))
    : [];

  const renderLicensesHeader = () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      Licenses
      <Tooltip title="Add License">
      <IconButton size="small" onClick={handleOpenLicenseModal}>
        <AddIcon />
      </IconButton>
      </Tooltip>
    </Box>
  );

  const renderUsersHeader = () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      Users
      <Tooltip title="Add User">
      <IconButton size="small" onClick={handleOpenUsersModal}>
        <AddIcon />
      </IconButton>
    </Tooltip>
    </Box>
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: "15px", marginLeft: "15px", marginRight: "15px" }}
    >
      <Grid item xs={6}>
        <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
          <ModalAddPool open={openModal} handleClose={handleCloseModal} />
          <CustomTable
            rows={poolRowData}
            columns={poolColumns}
            //rowsPerPage={10}
           // pageSize={10}
            checkBoxSelection={false}
            showAddPoolButton={true}
            onRowClick={handleRowClick}
          >
            <CustomButton
              title="Add Pool"
              variant="outlined"
              Theme={props.theme}
              onClick={handleAddPoolClick}
            />
          </CustomTable>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ marginTop: "45px" }}>
        <CustomTable
          rows={combinedTableRows}
          columns={[
            {
              field: "licenses",
              headerName: renderLicensesHeader(),
              flex: 1,
            },
            { field: "users", headerName: renderUsersHeader(), flex: 1, sortable: false },
          ]}
          //rowsPerPage={10}
         // pageSize={10}
          checkBoxSelection={false}
          onRowClick={() => {}}
          nosearch={true}
          hideSortIcons={true}
          className="licenses-users-table-container"
        />
        <style>{`
          .licenses-users-table-container .MuiDataGrid-sortIcon {
            display: none !important;
          }
        `}
        </style>
        <ModalAddLicensePool open={openLicenseModal} handleClose={handleCloseLicenseModal} />
        <ModalAddUsersPool open={openUsersModal} handleClose={handleCloseUsersModal} /> {/* New Users Modal */}
      </Grid>
    </Grid>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ConcurrentUser);
