import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Typography } from "@mui/material";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomTable from "../../../components/CustomTable/CustomTable";
import AdminTranslation from "../../../Utils/AdminTranslation/AdminTranslation";
// import Box from '@mui/material/Box';
import styles from "./UserManagement.module.css";
import ModalUserImport from "./Modals/ModalUserImport";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

const DirectoryUser = (props) => {
  let { language, theme } = props;

  const [openModal, setOpenModal] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [activatedRows, setActivatedRows] = useState([]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleImportDirectoryUsersClick = () => {
    setOpenModal(true); // Open modal when "ADD USER" button is clicked
  };

  const tableRowData = [
    {
      name: language === "en" ? "abc" : AdminTranslation["abc"],
      id: language === "en" ? "abc12" : AdminTranslation["abc12"],
      email:
        language === "en"
          ? "test@gmail.com"
          : AdminTranslation["test@gmail.com"],
    },
    {
      name: language === "en" ? "user" : AdminTranslation["user"],
      id: language === "en" ? "user12" : AdminTranslation["user12"],
      email:
        language === "en"
          ? "test@gmail.com"
          : AdminTranslation["test@gmail.com"],
    },
    {
      name: language === "en" ? "sample" : AdminTranslation["sample"],
      id: language === "en" ? "sample12" : AdminTranslation["sample12"],
      email:
        language === "en"
          ? "test@gmail.com"
          : AdminTranslation["test@gmail.com"],
    },
    {
      name: language === "en" ? "test" : AdminTranslation["test"],
      id: language === "en" ? "test12" : AdminTranslation["test12"],
      email:
        language === "en"
          ? "test@gmail.com"
          : AdminTranslation["test@gmail.com"],
    },
    {
      name: language === "en" ? "xyz" : AdminTranslation["xyz"],
      id: language === "en" ? "xyz12" : AdminTranslation["xyz12"],
      email:
        language === "en"
          ? "test@gmail.com"
          : AdminTranslation["test@gmail.com"],
    },
    {
      name: language === "en" ? "new" : AdminTranslation["new"],
      id: language === "en" ? "new12" : AdminTranslation["new12"],
      email:
        language === "en"
          ? "test@gmail.com"
          : AdminTranslation["test@gmail.com"],
    },
  ];

  // let changeButton = (item) => {
  //     console.log(item)
  // }
  const handleActivateUserClick = () => {
    setActivatedRows((prevActivatedRows) => [
      ...prevActivatedRows,
      ...selectedRows,
    ]);
    setSelectedRows([]);
  };

  const handleDeactivateUserClick = () => {
    setActivatedRows((prevActivatedRows) =>
      prevActivatedRows.filter((row) => !selectedRows.includes(row))
    );
    setSelectedRows([]);
  };
  const updatedRows = tableRowData.map((row) => ({
    ...row,
    activated: activatedRows.includes(row.id),
  }));

  const columns = [
    {
      field: "id",
      headerName: language === "en" ? "ID" : AdminTranslation["ID"],
      renderCell: (params) => (
        <Box>
          {params.value}
          {activatedRows.includes(params.value) && (
            <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
              Active
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "name",
      headerName: language === "en" ? "Name" : AdminTranslation["Name"],
      flex: 1,
    },
    {
      field: "email",
      headerName: language === "en" ? "Email" : AdminTranslation["Email"],
      flex: 1,
    },
  ];

  return (
    <Box className={styles.activeUserDirectoryMain}>
      <Box className={styles.activeDirTableDiv}>
        <ModalUserImport open={openModal} handleClose={handleCloseModal} />

        <CustomTable
          rows={updatedRows}
          columns={columns}
          //rowsPerPage={10}
         // pageSize={10}
          theme={theme}
          showDeleteButton={true}
          checkboxSelection={true}
          onSelectionChange={setSelectedRows}
        >
          <CustomButton
            title="Import"
            variant="outlined"
            startIcon={<VerticalAlignBottomIcon />}
            onClick={handleImportDirectoryUsersClick}
            type="submit"
            loading={false}
            disabled={false}
            fullWidth={true}
            loaderSize={25}
            loaderColor="success"
            loaderThickness={5}
            Theme={props.theme}
          />

<CustomButton
                        title={language === 'en' ? 'Activate' : AdminTranslation["Activate"]}
                        variant="outlined"
                        onClick={handleActivateUserClick}
                        type="submit"
                        loading={false}
                        // disabled={selectedRows.length === 0}
                        fullWidth={true}
                        loaderSize={25}
                        loaderColor="success"
                        loaderThickness={5}
                        Theme={props.theme}
                    />
                    <CustomButton
                        title={language === 'en' ? 'Deactivate' : AdminTranslation["Deactivate"]}
                        variant="outlined"
                        onClick={handleDeactivateUserClick}
                        type="submit"
                        loading={false}
                        // disabled={selectedRows.length === 0}
                        fullWidth={true}
                        loaderSize={25}
                        loaderColor="success"
                        loaderThickness={5}
                        Theme={theme}
                    />
        </CustomTable>
      </Box>
    </Box>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryUser);

// import React, { useState } from 'react';
// import CustomButton from '../../../components/CustomButton/CustomButton';
// import CustomTable from '../../../components/CustomTable/CustomTable';
// import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import InputLabel from '@mui/material/InputLabel';
// import TextareaAutosize from '@mui/base/TextareaAutosize';
// import styles from './UserManagement.module.css';

// const ActiveDirectoryUser = (props) => {

//     const [openModal, setOpenModal] = useState(false);
//     // let { language, theme } = props;
//     let { language } = props;

//     const openModalToImportUsersFromActiveDirectory = () => {
//         setOpenModal(true);
//     }

//     const searchButtonAction = () => {

//     }

//     const closeModal = () => {
//         setOpenModal(false);
//     }

//     const handleModalImport = () => {
//         console.log("Import button clicked");
//         // closeModal();
//     }

//     const handleModalCancel = () => {
//         // Add your cancel functionality here
//         console.log("Cancel button clicked");
//         closeModal();
//     }

//     const tableRowData = [
//         {
//             name: (language === 'en' ? 'abc' : AdminTranslation["abc"]),
//             id: (language === 'en' ? 'abc12' : AdminTranslation["abc12"]),
//             email: (language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"]),
//         },
//         {
//             name: (language === 'en' ? 'user' :  AdminTranslation["user"]),
//             id: (language === 'en' ? 'user12' :  AdminTranslation["user12"]),
//             email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

//         },
//         {
//             name: (language === 'en' ? 'sample' : AdminTranslation["sample"]),
//             id: (language === 'en' ? 'sample12' : AdminTranslation["sample12"]),
//             email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

//         },
//         {
//             name: (language === 'en' ? 'test' : AdminTranslation["test"]),
//             id: (language === 'en' ? 'test12' : AdminTranslation["test12"]),
//             email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

//         },
//         {
//             name: (language === 'en' ? 'xyz' : AdminTranslation["xyz"]),
//             id: (language === 'en' ? 'xyz12' : AdminTranslation["xyz12"]),
//             email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

//         },
//         {
//             name: (language === 'en' ? 'new' : AdminTranslation["new"]),
//             id: (language === 'en' ? 'new12' : AdminTranslation["new12"]),
//             email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

//         }
//     ]

//     let changeButton = (item) => {
//         console.log(item)
//     }

//     const columns = [
//         { field: 'id', headerName: (language === 'en' ? 'ID' : AdminTranslation["ID"]), flex: 1 },
//         { field: 'name', headerName: (language === 'en' ? 'Name' : AdminTranslation["Name"]), flex: 1 },
//         { field: 'email', headerName: (language === 'en' ? 'Email' : AdminTranslation["Email"]), flex: 1 },
//         {
//             field: 'action', headerName: (language === 'en' ? 'Action' : AdminTranslation["Action"]), flex: 1,
//             renderCell: (params) => {
//                 const onClick = (e) => {
//                     const currentRow = params.row;
//                     changeButton(currentRow)
//                 };

//                 return (
//                     <CustomButton
//                         className="deactivate-button"
//                         title={language === 'en' ? 'Deactivate' : AdminTranslation["Change"]}
//                         variant="outlined"
//                         onClick={onClick}
//                         type="submit"
//                         loading={false}
//                         disabled={false}
//                         fullWidth={true}
//                         loaderSize={25}
//                         loaderColor="success"
//                         loaderThickness={5}
//                     />
//                 );
//             },
//         }
//     ]

//     return (
//         <Box className={styles.activeUserDirectoryMain}>

//             <Box className={styles.activeDirImportUsersDirectory}>
//                 <h2>Import Users From Active Directory</h2>
//                 <CustomButton
//                     className={styles.importButton}
//                     title={language === 'en' ? 'Import' : AdminTranslation["Import"]}
//                     variant="outlined"
//                     onClick={openModalToImportUsersFromActiveDirectory}
//                     type="submit"
//                     loading={false}
//                     disabled={false}
//                     fullWidth={true}
//                     loaderSize={25}
//                     loaderColor="success"
//                     loaderThickness={5}
//                 />
//             </Box>
//             <Box className={styles.activeDirTableDiv}>
//                 <CustomTable rows={tableRowData} columns={columns} //rowsPerPage={10}// pageSize={10} checkBoxSelection={false} showImportButton={true}/>
//             </Box>

//             <Modal
//                 open={openModal}
//                 onClose={closeModal}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box className={styles.activeDirModalBox}>
//                     <Box className={styles.activeDirModalHeader}>
//                         {language === 'en' ? <h1>Import Users From Active Directory</h1> : <h1>{AdminTranslation['Import Users From Active Directory']}</h1> }
//                     </Box>
//                     <form className={styles.activeDirModalForm}>

//                         <Box className={styles.activeDirModalTitle}>
//                             {language === 'en' ? <h2>Active Directory Server Settings</h2> : <h1>{AdminTranslation['Active Directory Server Settings']}</h1> }
//                         </Box>

//                         <Box className={styles.activeDirModalTextFields}>
//                             <TextField label="Hostname" fullWidth margin="normal" size="small"/>
//                             {/* <TextField label={language === 'en'? "Hostname" : AdminTranslation['Hostname']} fullWidth margin="normal"/> */}
//                             <TextField label="Port" fullWidth margin="normal" size="small"/>
//                             <TextField label="Base DN" fullWidth margin="normal" size="small"/>
//                         </Box>

//                         <Box className={styles.activeDirModalTextFields}>
//                             <TextField label="Username" fullWidth margin="normal" size="small"/>
//                             <TextField label="Password" type="password" fullWidth margin="normal" size="small"/>
//                             <FormControlLabel
//                                 control={<Checkbox style={{ color: "#0d7e8a" }}/>}
//                                 label="Save Password"
//                             />
//                         </Box>

//                         <Box className={styles.activeDirModalTextFields}>
//                             <TextField label="User Filter" fullWidth margin="normal" size="small"/>
//                             <TextField label="Group Filter" fullWidth margin="normal" size="small"/>
//                             <CustomButton
//                                 className={styles.activeDirSearchButton}
//                                 title={language === 'en' ? 'Search' : AdminTranslation["Search"]}
//                                 variant="outlined"
//                                 onClick={searchButtonAction}
//                                 type="submit"
//                                 loading={false}
//                                 disabled={false}
//                                 fullWidth={true}
//                                 loaderSize={25}
//                                 loaderColor="success"
//                                 loaderThickness={5}
//                             />
//                         </Box>

//                         {/* <Box>
//                             <Box>
//                                 <text>Active Directory Users</text>
//                                 <Box style={{border:"2px solid red", width:"30%", height:"200px"}}></Box>
//                             </Box>
//                             <Box>
//                                 <FormControlLabel
//                                         control={<Switch />}
//                                         label="Select All"
//                                 />
//                             </Box>
//                         </Box> */}

//                         <Box className={styles.activeDirModalTextFields}>
//                             <Box>
//                                 <InputLabel htmlFor="activeDirectoryUsers" >Active Directory Users</InputLabel>
//                                 <TextareaAutosize id="activeDirectoryUsers" label="Active Directory Users" fullWidth margin="normal" />
//                             </Box>
//                             <Box style={{ display: 'flex', flexDirection: 'column' }}>
//                                 <FormControlLabel
//                                     control={<Switch />}
//                                     label="Select All"
//                                 />
//                             </Box>

//                             <Box>
//                                 <InputLabel htmlFor="activeDirectoryGroups">Active Directory Security Groups</InputLabel>
//                                 <TextareaAutosize id="activeDirectoryGroups" label="Active Directory Security Groups" fullWidth margin="normal" />
//                             </Box>
//                             <Box style={{ display: 'flex', flexDirection: 'column' }}>
//                                 <FormControlLabel
//                                     control={<Switch />}
//                                     // control={<Switch style={{ color: ('checked' ? '#0d7e8a' : 'primary') }} />}
//                                     label="Select All"
//                                 />
//                             </Box>
//                         </Box>

//                     </form>
//                     <Box className={styles.activeDirModalFooter}>
//                         <CustomButton
//                             className={styles.activeDirImport}
//                             title={language === 'en' ? 'Import' : AdminTranslation["Import"]}
//                             variant="outlined"
//                             setButtonColor={true}
//                             onClick={handleModalImport}
//                             type="submit"
//                             loading={false}
//                             disabled={false}
//                             fullWidth={true}
//                             loaderSize={25}
//                             loaderColor="success"
//                             loaderThickness={5}
//                         />
//                         <CustomButton
//                             className={styles.activeDirCancel}
//                             title={language === 'en' ? 'Cancel' : AdminTranslation["Cancel"]}
//                             variant="outlined"
//                             setButtonColor={true}
//                             onClick={handleModalCancel}
//                             type="submit"
//                             loading={false}
//                             disabled={false}
//                             fullWidth={true}
//                             loaderSize={25}
//                             loaderColor="success"
//                             loaderThickness={5}
//                         />

//                     </Box>

//                 </Box>
//             </Modal>
//         </Box>
//     );
// }

// export default ActiveDirectoryUser;
