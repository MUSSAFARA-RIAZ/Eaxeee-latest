import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Box, IconButton, Typography, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomTable from "../../../components/CustomTable/CustomTable";
import ModalAddPool from "./Modals/ModalAddPool";
import ModalAddLicensePool from "./Modals/ModalAddLicensePool";
import ModalAddUsersPool from "./Modals/ModalAddUsersPool";
import AdminTranslation from "../../../Utils/AdminTranslation/AdminTranslation";
import { getPools, getPoolLicensesAndUsers, updatePoolLicensesAndUsers, deletePool } from "../../../apis/license_management";
import { UpdateDisabled } from "@mui/icons-material";
import AlertComponent from "../../../components/alerts/AlertComponent";
function ConcurrentUser(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openLicenseModal, setOpenLicenseModal] = useState(false);
  const [openUsersModal, setOpenUsersModal] = useState(false); // New state for Users Modal
  const [selectedPool, setSelectedPool] = useState(null);
  const [poolRowData, setPoolRowData] = useState([]);
  const [selectedPoolOriginalData, setSelectedPoolOriginalData] = useState([]);
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);
  const [disableRemoveButton, setDisableRemoveButton] = useState(false);
    const [alertMessage, setAlertMessage] = useState(""); // Alert message state
  // const [setAlertMessageMessage, setAlertMessage] = useState(""); // Alert message state

  // const [usersFromDatabase, setUsersFromDatabase] = useState([]);
  const { language, theme } = props;

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenLicenseModal = () => {
    console.log("add license fclickedl..  ")
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

  const handleuUpdatePoolClick = async () => {
    console.log("seleted_pool_is: ", selectedPool)
    console.log("seleted_original_pool_is: ", selectedPoolOriginalData)
    console.log("equality: ", selectedPoolOriginalData === selectedPool)

    if (selectedPool) {

      const res = await updatePoolLicensesAndUsers(selectedPool.name, selectedPool.licenses, selectedPool.users);
      if (res.code === 200) {
        console.log("pool was updated successfully...")
        setAlertMessage(res.data.message)
      }
      else {
        console.log("following error occured while updating pool.")
        console.log(res)
        setAlertMessage(res.error)
      }
    }
  };


  const handleRemovePoolClick = async () => {

    console.log("clicked handled remove")
    if (selectedPool) {
      setDisableRemoveButton(true)
      const res = await deletePool(selectedPool.name);
      setDisableRemoveButton(false)
      if (res.code === 200) {

        setPoolRowData(prevPoolRowData =>
          prevPoolRowData.filter(pool => pool.name !== selectedPool.name)
        );
        setSelectedPool(null)
        console.log("Pool was removed successfully...")
        setAlertMessage(res.data.message)
      }
      else {
        console.log("following error occured while deleting pool.")
        console.log(res)
        setAlertMessage(res.error)
      }
    }
  };
  const updateUsersListOnFrontEnd = () => {

  };

  // const handleRowClick = async (rowData) => {
  //   console.log("poolselected", selectedPool);
  //   console.log("rowData", rowData)
  //   setSelectedPool(rowData.row);
  //   // const res = await getPoolLicensesAndUsers()
  // };

  const handleRowClick = async (rowData) => {

    setSelectedPool(null)



    // Call the API to get pool licenses and users
    const res = await getPoolLicensesAndUsers(rowData.row.name);

    if (res.code === 200) {
      // Find the pool to update and directly modify its licenses
      const updatedPoolRowData = poolRowData.map(pool => {
        if (pool.name === rowData.row.name) {

          // Update the licenses and exit early
          const updatedPool = {
            ...pool,
            licenses: res.data.poolLicense || [], // Use licenses from API response or empty array
            users: res.data.poolUsers || [], // Use licenses from API response or empty array
            availableUsers: res.data.availableUsers || [],
            availableLicenses: res.data.availableLicense || [],
            first_api_called: true // Use licenses from API response or empty array
          };

          // Set the updated pool as the selected pool
          const availableUsers = res.data.availableUsers?.map((item, index) => {
            let temp = { id: index + 1, user: item }
            return temp
          })
          console.log("availableUsers:", availableUsers);

          // setUsersFromDatabase(availableUsers)
          setSelectedPool(updatedPool);
          setSelectedPoolOriginalData(updatedPool);

          return updatedPool;
        }
        return pool; // No changes for other pools
      });

      // Update the state with the modified poolRowData

      // setPoolRowData(updatedPoolRowData);

      console.log("updated_pool data:")
      console.log(updatedPoolRowData)

    } else {
      setAlertMessage(res.error);
    }


  };

  useEffect(() => {
    getPools()
      .then((res) => {

        if (res.code === 200) {
          const listOfPools = res.data.map((pool, index) => ({
            id: index + 1, // Adding unique id
            name: pool.pool_name,
            role: pool.role_type,
            licenses: pool.licenses || [],
            users: pool.users || [],
            first_api_called: false,

          }));

          // Uncomment and update the state when needed
          setPoolRowData(listOfPools);

          console.log("Available licenses fetched:", listOfPools);
        } else if (res.code === 401) {
          console.error("Unauthorized access:", res.data);
        } else {
          console.error("Error fetching available licenses:", res.message || "Unknown error");
        }
      })
      .catch((error) => {
        console.error("Error fetching available licenses:", error);
      });

  }, []);

  // const poolRowData = [
  //   {
  //     id: "1",
  //     name: "dea1",
  //     role: "Repository Admin",
  //     licenses: ["lisnxend47", "lisnxend1"],
  //     users: ["User1", "User2"],
  //   },
  //   {
  //     id: "2",
  //     name: "dea2",
  //     role: "Repository Admin",
  //     licenses: ["lisnxend43", "lisnxend122"],
  //     users: ["User3", "User4"],
  //   },
  //   {
  //     id: "3",
  //     name: "dea1",
  //     role: "Organization Portal",
  //     licenses: ["lisnxend5"],
  //     users: ["User5", "User6"],
  //   },
  //   {
  //     id: "4",
  //     name: "abc",
  //     role: "Architect",
  //     licenses: ["lisnxend29"],
  //     users: ["User7", "User8"],
  //   },
  //   {
  //     id: "5",
  //     name: "GM",
  //     role: "Repository Admin",
  //     licenses: ["lisnxend99", "lisnxend14"],
  //     users: ["User9", "User10"],
  //   },
  //   {
  //     id: "6",
  //     name: "xyz",
  //     role: "Repository Admin",
  //     licenses: ["lisnxend1", "lisnxend13"],
  //     users: ["User11", "User12"],
  //   },
  // ];


  const poolColumns = [
    { field: "name", headerName: language === "en" ? "Name" : AdminTranslation['Name'], flex: 1 },
    { field: "role", headerName: language === "en" ? "Role" : AdminTranslation["Role"], flex: 1 },
  ];

  const combinedTableRows = selectedPool
    ? selectedPool.licenses.map((license, index) => ({
      id: `license-${index}`,
      licenses: license,
      users: selectedPool.users[index],
    }))
    : [];
  const licenseTableRows = selectedPool
    ? selectedPool.licenses.map((license, index) => ({
      id: `license-${index}`,
      licenses: license,
    }))
    : [];

  const userTableRows = selectedPool
    ? selectedPool.users.map((user, index) => ({
      id: `user-${index}`,
      users: user,
    }))
    : [];

  const renderLicensesHeader = () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>

      {
        language === 'en' ? "Licenses" : AdminTranslation["Licenses"]
      }

      <Tooltip title="Add License">
        <IconButton size="small" onClick={handleOpenLicenseModal}>
          <AddIcon />

        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderUsersHeader = () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>

      {
        language === 'en' ? "Users" : AdminTranslation["Users"]
      }

      <Tooltip title="Add User">
        <IconButton size="small" onClick={handleOpenUsersModal}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <>
    {alertMessage && (
      <AlertComponent
        message={alertMessage}
        severity={alertMessage.includes("success") ? "success" : "warning"}
        onClose={() => setAlertMessage("")} // Reset message on close
      />
    )}
    <Grid container spacing={2} sx={{ marginTop: "15px", marginLeft: "15px", marginRight: "15px" }}>
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Pool Table */}
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
            <ModalAddPool open={openModal} handleClose={handleCloseModal} />
            <CustomTable
              rows={poolRowData}
              columns={poolColumns}
              checkBoxSelection={false}
              showAddPoolButton={true}
              onRowClick={handleRowClick}
            >
              <Box sx={{
                display: "flex", justifyContent: "space-between", alignItems: "space-between", width: "500px", ...(language === 'ar' && {
                  display: "flex", width: "400px", justifyContent: "space-between", position: "relative", right: "10px"
                })
              }}>
                {/* title={language === 'en' ? "Add User": AdminTranslation["Add User"]}  */}
                <CustomButton title={language === 'en' ? "Add Pool" : AdminTranslation["Add Pool"]}
                  variant="outlined" Theme={props.theme} onClick={handleAddPoolClick} />
                <CustomButton title={language === 'en' ? "Remove Pool" : AdminTranslation["Remove Pool"]}
                  variant="outlined" Theme={props.theme} onClick={handleRemovePoolClick} disabled={disableRemoveButton || !selectedPool} />
                <CustomButton title={language === 'en' ? "Update Pool" : AdminTranslation["Update Pool"]}
                  variant="outlined" Theme={props.theme} onClick={handleuUpdatePoolClick} disabled={!selectedPool || selectedPool === selectedPoolOriginalData} />
              </Box>
            </CustomTable>
          </Box>
        </Grid>

        {/* Licenses Table */}
        <Grid item xs={3} sx={{ marginTop: "53px", marginLeft: "20px" }}>
          <CustomTable
            rows={licenseTableRows} // Licenses data
            columns={[
              {
                field: "licenses",
                headerName: renderLicensesHeader(),
                flex: 1,
              },
            ]}
            checkBoxSelection={false}
            nosearch={true}
            hideSortIcons={true}
            sx={{
              width: "200px", // Adjust to fit single column
              overflow: "hidden", // Prevent scrollbars
              "& .MuiDataGrid-root": {
                maxWidth: "200px", // Match table width
              },
            }}
            className="licenses-table-container"
          />
          <style>{`
    .licenses-table-container .MuiDataGrid-sortIcon {
      display: none !important;
    }
  `}</style>
          <ModalAddLicensePool open={openLicenseModal} handleClose={handleCloseLicenseModal} selectedPool={selectedPool} updateSelectedPool={(updatedPool) => setSelectedPool(updatedPool)} />
        </Grid>

        {/* Users Table */}
        <Grid item xs={3} sx={{ marginTop: "53px", marginLeft: "20px" }}>
          <CustomTable
            rows={userTableRows} // Users data
            columns={[
              {
                field: "users",
                headerName: renderUsersHeader(),
                flex: 1,
              },
            ]}
            checkBoxSelection={false}
            nosearch={true}
            hideSortIcons={true}
            sx={{
              width: "200px", // Adjust to fit single column
              overflow: "hidden", // Prevent scrollbars
              "& .MuiDataGrid-root": {
                maxWidth: "200px", // Match table width
              },
            }}
            className="users-table-container"
          />
          <style>{`
    .users-table-container .MuiDataGrid-sortIcon {
      display: none !important;
    }
  `}</style>
          <ModalAddUsersPool open={openUsersModal} handleClose={handleCloseUsersModal} selectedPool={selectedPool} updateSelectedPool={(updatedPool) => setSelectedPool(updatedPool)} />
        </Grid>

      </Box>
    </Grid>
    </>
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
