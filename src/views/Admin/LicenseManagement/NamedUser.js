import React, { useState } from "react";
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
  Radio, RadioGroup
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

  const AvailableLicensesRowData = [
    {
      id: "1",
      license_id: "111",
      license_role: "hehe",
      start_date: "12-3-24",
      end_date: "24-9-26",
      license_type: "heheha",
    },
  ];
  const AvailableLicensesColumns = [
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


  const activatedUsers = [
    "User 1",
    "User 2",
    "User 3",
    "User 4",
    "User 5",
    "User 6",
    "User 7",
    "User 8",
    "User 9",
  ];

  const [selectedActivatedUsers, setSelectedActivatedUsers] = useState([]);
  const [isAllActivatedUsersSelected, setIsAllActivatedUsersSelected] =
    useState(false);

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

  const AllocatedLicensesRowData = [
    {
      id: "1", // Adding unique id
      license_id: "Named001",
      license_role: "Repository Admin",
      user: "Admin",
    },
    {
      id: "2", // Adding unique id
      license_id: "Eaxee1ADMX7sp4",
      license_role: "Repository Admin",
      user: "Arbab",
    },
    {
      id: "3", // Adding unique id
      license_id: "Named0041",
      license_role: "Repository Admin",
      user: "Athar",
    },
    {
      id: "4", // Adding unique id
      license_id: "EAXee1ADMgnX2MAtB7a0a",
      license_role: "Repository Admin",
      user: "masif",
    },
    {
      id: "5", // Adding unique id
      license_id: "Named002",
      license_role: "Repository Admin",
      user: "Mahnoor",
    },
    {
      id: "6", // Adding unique id
      license_id: "Named003",
      license_role: "Repository Admin",
      user: "Musaffara",
    },
  ];

  const deallocateButton = (item) => {
    console.log(item);
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

  const handleAllocateUserClick = () => { };

  const handleCheckboxChange = (user) => {
    setSelectedActivatedUsers((prevSelected) => {
      if (prevSelected.includes(user)) {
        return prevSelected.filter((selectedUser) => selectedUser !== user);
      } else {
        return [...prevSelected, user];
      }
    });
  };

  const [tabValue, setTabValue] = useState(0);

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
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRadioChange = (user) => {
    setSelectedUser(user); // Set the selected user
  };

  const isArabic = props.language === 'ar'
  return (
    <Box className={`${styles.namedUserMain}`}>
<Box sx={{float:isArabic?"right":"left"}}>
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
                checkBoxSelection={false}
              //   TableMainDivHeight={{ height: "44vh" }}
              //   DataGridDivHeight={{ height: "calc(43vh - 48px)" }}
              />
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
                marginBottom: "100px",
                border:
                  theme === "dark" ? "1px solid #515151" : "1px solid #e0e0e0",
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
                      float: "right"


                      // Adjust the padding to reduce the height
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
            <CustomButton
              className="allocate-button"
              title={
                language === "en" ? "Allocate" : AdminTranslation["Allocate"]
              }
              variant="outlined"
              onClick={handleAllocateUserClick}
              type="submit"
              loading={false}
              disabled={false}
              fullWidth={true}
              loaderSize={25}
              loaderColor="success"
              loaderThickness={5}
              Theme={theme}
            />
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
