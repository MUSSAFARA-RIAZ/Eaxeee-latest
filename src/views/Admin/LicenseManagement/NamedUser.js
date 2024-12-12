import React, { useEffect, useRef, useState } from "react";
import { getAllocatedNamedLicenses, getAvailableNamedLicenses,deAllocateNamedLicense,allocateLicense } from "../../../apis/license_management";
import { getListofUsers } from "../../../apis/user_management";
import { connect } from "react-redux";
import {
  Box,
  Typography,
  Tooltip,
  Stack,
  IconButton,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Radio, RadioGroup,
  FormControlLabel
} from "@mui/material";
import CustomTabs from "../../../components/CustomTabs/CustomTabs"; // Import CustomTabs
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomTable from "../../../components/CustomTable/CustomTable";
import styles from "./LicenseManagement.module.css";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import AdminTranslation from "../../../Utils/AdminTranslation/AdminTranslation";


function NamedUser(props) {
  let { language, theme } = props;


  // const AvailableLicensesRowData = [
  //   {
  //     id: "1",
  //     license_id: "111",
  //     license_role: "hehe",
  //     start_date: "12-3-24",
  //     end_date: "24-9-26",
  //     license_type: "heheha",
  //   },
  // ];
  const [selectedAvailableLicenseRow, setSelectedAvailableLicenseRow] = useState(null);
  const selectedARows = useRef([]);
  const handleRadio = (event, selectedRow) => {
    console.log("Selected License ID: ", selectedRow.license_id);
    setSelectedLicenseId(selectedRow.license_id); 
    setSelectedAvailableLicenseRow(selectedRow); 
    selectedARows.current = selectedRow;
  };
  
  const AvailableLicensesColumns = [
    // {
    //   field: "id",
    //   headerName: language === 'en' ? "Selecte" : AdminTranslation["License ID"],
    //   flex: 1
    // },
    {
      field: "select",
      headerName: "Select",
      flex: 0.5,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Radio
              aria-label="selectedLicense"
              name="selectedLicense"
              value={params.row.license_id}
              style={{

              }}
              checked={selectedLicenseId === params.row.license_id} // Make sure the radio is checked only if it matches the selectedLicenseId
              onChange={(e) => handleRadio(e, params.row)}
            />
          }
          label=""
          style={{
            paddingLeft: '5px',
            marginRight: '10px',
            lineHeight: '10px',
          }}
        />
      ),
      sortable: false,
    },
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: "license_id",
      headerName: language === 'en' ? "License ID" : AdminTranslation["License ID"],
      flex: 1
    },
    {
      field: "license_role",
      headerName: language === 'en' ? "License Role" : AdminTranslation["License Role"],
      flex: 1
    },
    {
      field: "start_date",
      headerName: language === 'en' ? "Start Date" : AdminTranslation["Start Date"],
      flex: 1
    },
    {
      field: "end_date",
      headerName: language === 'en' ? "End Date" : AdminTranslation["End Date"],
      flex: 1
    },
    {
      field: "license_type",
      headerName: language === 'en' ? "License Type" : AdminTranslation["License Type"],
      flex: 1
    },
  ];


  // const activatedUsers = [
  //   "User 1",
  //   "User 2",
  //   "User 3",
  //   "User 4",
  //   "User 5",
  //   "User 6",
  //   "User 7",
  //   "User 8",
  //   "User 9",
  //   "User 11",
  //   "User 12",
  //   "User 13",
  //   "User 14",
  //   "User 15",
  //   "User 16",
  //   "User 17",
  //   "User 18",
  //   "User 19",
  // ];

  const [activatedUsers, setActivatedUsers] = useState([])
  const [AvailableLicensesRowData, setAvailableLicensesRowData] = useState([])
  const [AllocatedLicensesRowData, setAllocatedLicensesRowData] = useState([])
  const [selectedActivatedUsers, setSelectedActivatedUsers] = useState([]);
  const [isAllActivatedUsersSelected, setIsAllActivatedUsersSelected] = useState(false);
  const [recallAvailableNamedLicenses, setRecallAvailableNamedLicenses] = useState(0);
  const [recallAllocatedNamedLicenses, setRecallAllocatedNamedLicenses] = useState(0);
  const [selectedLicenseIds, setSelectedLicenseIds] = useState('');
  const [selectedLicenseId, setSelectedLicenseId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [disableAllocate, setDisableAllocate] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  // setRecallAvailableLicenses(!recallAvailableLicenses)
  // Call List of available named licenses
  useEffect(() => {
    getAvailableNamedLicenses()
      .then((res) => {
        if (res.code === 200) {
          const formattedAvailableLicenses = res.data.map((license, index) => ({
            id: index + 1, // Adding unique id
            license_id: license.license_id,
            license_role: license.license_role,
            start_date: license.start_date,
            end_date: license.end_date,
            license_type: license.license_type,
          }));

          // Uncomment and update the state when needed
          setAvailableLicensesRowData(formattedAvailableLicenses);

          console.log("Available licenses fetched:", formattedAvailableLicenses);
        } else if (res.code === 401) {
          console.error("Unauthorized access:", res.data);
        } else {
          console.error("Error fetching available licenses:", res.message || "Unknown error");
        }
      })
      .catch((error) => {
        console.error("Error fetching available licenses:", error);
      });
      
  }, [recallAvailableNamedLicenses ]);


  // Call list of allocated licenses

  useEffect(() => {
    getAllocatedNamedLicenses()
      .then((res) => {
        if (res.code === 200) {
          const formattedAllocatedLicenses = res.data.map((license, index) => ({
            id: index + 1, // Adding unique id
            license_id: license.license_id,
            license_role: license.license_role,
            user: license.username,
          }));

          // Uncomment and update the state when needed
          setAllocatedLicensesRowData(formattedAllocatedLicenses);

          console.log("Allocated licenses fetched:", formattedAllocatedLicenses);
        } else if (res.code === 401) {
          console.error("Unauthorized access:", res.data);
        } else {
          console.error("Error fetching available licenses:", res.message || "Unknown error");
        }
      })
      .catch((error) => {
        console.error("Error fetching available licenses:", error);
      });
  }, [recallAllocatedNamedLicenses]);


  useEffect(() => {
    getListofUsers()
      .then((res) => {
        console.log("the_data_res; ",res);
        if (res.code === 200) {
          console.log("the_data; ",res.data);
          setActivatedUsers(res.data);
        }
        else if (res.code === 401) {
          console.error("Unauthorized access:", res.data);}
          else {
            console.error("Error fetching available licenses:", res.message || "Unknown error");
          }
      })

          
        
  }, []);


  const handleSelectAllActivatedUsers = () => {
    const allSelected = !selectedActivatedUsers.length; // Check if all users are currently selected
    const updatedSelectedUsers = activatedUsers.map((user) => user); // Copy the user list

    if (allSelected) {
      // If all are not selected, select all users
      setSelectedActivatedUsers(updatedSelectedUsers);
    } else {
      // If all are selected, deselect all users
      setSelectedActivatedUsers([]);
    }

    // Update isAllactivatedUsersSelected based on the new selection state
    setIsAllActivatedUsersSelected(allSelected);
  };

  // const AllocatedLicensesRowData = [
  //   {
  //     id: "1", // Adding unique id
  //     license_id: "Named001",
  //     license_role: "Repository Admin",
  //     user: "Admin",
  //   },
  //   {
  //     id: "2", // Adding unique id
  //     license_id: "Eaxee1ADMX7sp4",
  //     license_role: "Repository Admin",
  //     user: "Arbab",
  //   },
  //   {
  //     id: "3", // Adding unique id
  //     license_id: "Named0041",
  //     license_role: "Repository Admin",
  //     user: "Athar",
  //   },
  //   {
  //     id: "4", // Adding unique id
  //     license_id: "EAXee1ADMgnX2MAtB7a0a",
  //     license_role: "Repository Admin",
  //     user: "masif",
  //   },
  //   {
  //     id: "5", // Adding unique id
  //     license_id: "Named002",
  //     license_role: "Repository Admin",
  //     user: "Mahnoor",
  //   },
  //   {
  //     id: "6", // Adding unique id
  //     license_id: "Named003",
  //     license_role: "Repository Admin",
  //     user: "Musaffara",
  //   },
  // ];

  const deallocateButton = async (item) => {
    try {
        // Call the API to deallocate the license
        const res = await deAllocateNamedLicense(item.license_id, item.user);
        
        if (res.code === 200) {
            console.log("Deallocation successful:", res.message);
            
            // Update the state to remove the deallocated license
            setAllocatedLicensesRowData((prevData) =>
                prevData.filter((row) => row.id !== item.id)
            );
            alert("License Deallocated Successfully")
            setRecallAvailableNamedLicenses(!recallAllocatedNamedLicenses)
        } else {
         
            console.log("Error deallocating license:", res.error || "Unknown error");
        }
    } catch (error) {
      
        console.error("Error during deallocation:", error);
    }
};

  const AllocatedLicensesColumns = [
    { field: "license_id", headerName: language === "en" ? "License ID" : AdminTranslation["License ID"], flex: 1 },
    { field: "license_role", headerName: language === "en" ? "License Role" : AdminTranslation["License Role"], flex: 1 },
    { field: "user", headerName: language === "en" ? "User" : AdminTranslation["User"], flex: 1 },
    {
      field: "Deallocate",
      headerName:
        language === "en" ? "Deallocate" : AdminTranslation["Deallocate"],
      flex: 1,
      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          deallocateButton(currentRow);
        };

        return (
          <CustomButton
            className="deallocate-button"
            title={
              language === "en" ? "Deallocate" : AdminTranslation["Deallocate"]
            }
            variant="outlined"
            Theme={props.theme}
            onClick={onClick}
            type="submit"
            loading={false}
            disabled={false}
            fullWidth={true}
            loaderSize={25}
            loaderColor="success"
            loaderThickness={5}
          />
        );
      },
    },
  ];

  const handleAllocateUserClick = async () => {
    setDisableAllocate(true);
    console.log("Allocate was clicked");
    console.log("selectedUser: ", selectedUser);
    console.log("selectedLicenseId: ", selectedLicenseId);
  
    if (selectedUser && selectedLicenseId) {
      try {
        const res = await allocateLicense(selectedLicenseId, selectedUser);
  
        if (res.code === 200) {
          console.log("License was allocated successfully");
  
          // Remove the allocated license from AvailableLicensesRowData
          setAvailableLicensesRowData(prevData =>
            prevData.filter(license => license.license_id !== selectedLicenseId)
          );
          setRecallAllocatedNamedLicenses(!recallAllocatedNamedLicenses)
          alert(res.data.message);
        } else {
          console.log("Couldn't allocate license.");
          alert(res.error);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  
    setDisableAllocate(false);
    setSelectedLicenseId(null);
  };
  

  const handleCheckboxChange = (user) => {
    setSelectedActivatedUsers((prevSelected) => {
      if (prevSelected.includes(user)) {
        return prevSelected.filter((selectedUser) => selectedUser !== user);
      } else {
        return [...prevSelected, user];
      }
    });
  };

  



  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

  };

  const tabs = [
    {
      label:
        language === "en"
          ? "Available Licenses"
          : AdminTranslation["Available Licenses"],
    },
    {
      label:
        language === "en"
          ? "Allocated Licenses"
          : AdminTranslation["Allocated Licenses"],
    },
  ];
  

  const handleRadioChange = (user) => {
    setSelectedUser(user); // Set the selected user
  };
  const handleNamedUserCheckboxChange = (id) => {
    console.log("id:", id);
    console.log("AvailableLicensesRowData:", AvailableLicensesRowData);

    // Use == for loose equality to allow type coercion
    const selectedLicense = AvailableLicensesRowData.find((item) => item.id == id);

    if (selectedLicense) {
        setSelectedLicenseIds(selectedLicense.license_id)
          console.log("set in state: ",selectedLicense.license_id)
        
        return selectedLicense.license_id; // Return the license_id if needed
    } else {
        console.log("No matching license found for ID:", id);
    }
};


  const isArabic = props.language === 'ar'
  return (
    <Box className={`${styles.namedUserMain}`}>
      <Box sx={{ float: isArabic ? "right" : "left" }}>
        <CustomTabs value={tabValue} onChange={handleTabChange} tabs={tabs} />
      </Box>






      {tabValue === 0 && (
        <Box className={`${styles.AvailableLicensesandActivatedUsersDiv}`}>
          <Box className={`${styles.AvailableLicensesDiv}`}>
            <Box className={`${styles.namedUserTableAvailableLicenses}`}>
              <CustomTable
                rows={AvailableLicensesRowData}
                columns={AvailableLicensesColumns}
                //rowsPerPage={10}
                // pageSize={10}
                checkboxSelection={false}
                onSelectionChange={(id)=>{handleNamedUserCheckboxChange(id)}}
              //   TableMainDivHeight={{ height: "44vh" }}
              //   DataGridDivHeight={{ height: "calc(43vh - 48px)" }}
              />
              {/* <CustomTable
                rows={AvailableLicensesRowData}
                columns={AvailableLicensesColumns}
                // onDeleteClick={() => { }}
                // showDeleteButton={true}
                // onSelectionChange={() => { }}
                Theme={theme}
                checkboxSelection={true}
                // deleteButtonDisabled={true}
              /> */}
            </Box>
          </Box>
          <Box className={`${styles.activatedUsersDiv}`}>
            <Stack
              direction={"row"} justifyContent={'space-between'}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  margin: "5px 0",
                  padding: "5px",
                  color: theme === "dark" ? "#ffffff" : "#414849",
                  fontSize: "large",
                }}
              >
                {language === "en"
                  ? "Activated Users"
                  : AdminTranslation["Activated Users"]}
              </Typography>

            </Stack>
            <List
              className={`${styles.activatedUsersList}`}
              sx={{
                marginBottom: "50px",
                height: "400px",
                // border: "2px solid red",
                padding: "10px",
                overflowY: "auto", // Enable vertical scrolling
                // Scrollbar styles
                "&::-webkit-scrollbar": {
                  width: "10px",
                },
                "&::-webkit-scrollbar-track": {
                  background:
                    theme === "default"
                      ? "#cecece"
                      : theme === "light"
                        ? "#eff3f7"
                        : "#212121",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background:
                    theme === "default"
                      ? "#2158a4"
                      : theme === "light"
                        ? "#cbd0d7"
                        : "#a5d149",
                  borderRadius: "10px",
                },
              }}
            >
              <RadioGroup value={selectedUser} onChange={(e) => handleRadioChange(e.target.value)}>
                {activatedUsers.map((user, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      padding: language === "en" ? "2px 16px" : "0px",
                      float: "right", // Consider whether "float: right" is necessary
                    }}
                  >
                    <Radio
                      value={user}
                      style={{
                        height: 0,
                        color: theme === "default" ? "#2158a4" : "#a5d149",
                      }}
                    />
                    <ListItemText primary={user} />
                  </ListItem>
                ))}
              </RadioGroup>
            </List>

            <Box sx={{ position: "relative", left: "30px" }}>
              <CustomButton
                className="allocate-button"
                title={
                  language === "en" ? "Allocate" : AdminTranslation["Allocate"]
                }
                variant="outlined"
                onClick={handleAllocateUserClick}
                type="submit"
                loading={false}
                disabled={disableAllocate || (!selectedUser || !selectedLicenseId )}
                fullWidth={true}
                loaderSize={25}
                loaderColor="success"
                loaderThickness={5}
                Theme={theme}
              />
            </Box>
          </Box>
        </Box>
      )}
      {tabValue === 1 && (
        <Box className={`${styles.AvailableLicensesandActivatedUsersDiv}`}>
          <Box className={`${styles.AvailableLicensesDiv}`}>
            <Box className={`${styles.namedUserTableAllocatedLicenses}`}>
              <CustomTable
                rows={AllocatedLicensesRowData}
                columns={AllocatedLicensesColumns}
                //rowsPerPage={10}
                // pageSize={10}
                checkBoxSelection={false}
              />
            </Box>
          </Box>

        </Box>
      )}
    </Box>

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

export default connect(mapStateToProps, mapDispatchToProps)(NamedUser);
