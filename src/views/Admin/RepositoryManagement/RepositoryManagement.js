// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { Box } from '@mui/material'
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import BackupIcon from '@mui/icons-material/Backup';
// import RestoreIcon from '@mui/icons-material/Restore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import styles from './RepositoryManagement.module.css';
// import CustomButton from '../../../components/CustomButton/CustomButton';
// import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
// import CustomTabs from '../../../components/CustomTabs/CustomTabs';

// const RepositoryManagement = (props) => {

//     let { language, theme } = props;    
//     const [repositorytab, setRepositorytab] = useState(0);

//     const handleRepositorytab = (event, newRepositorytab) => {        
//         setRepositorytab(newRepositorytab);        
//     };

//     const tabs = [
//         { label: language === 'en' ? 'Clear' : AdminTranslation["Clear"], icon: <HowToRegIcon /> },
//         { label: language === 'en' ? 'Backup' : AdminTranslation["Backup"], icon: <BackupIcon /> },
//         { label: language === 'en' ? 'Restore' : AdminTranslation["Restore"], icon: <RestoreIcon /> }
//       ];

//     return (
//         <>
//             <Box className={styles.main}>
//                 <CustomTabs value={repositorytab} onChange={handleRepositorytab} tabs={tabs} />    

//                 {/* <ToggleButtonGroup
//                     value={repositorytab}
//                     exclusive
//                     onChange={handleRepositorytab}
//                     className={`${styles.repositoryManagementSubTabsGroup}`}
//                 >
//                     <ToggleButton value="Clear" aria-label="Clear" className={`${styles.repositoryManagementSubTabs}`} >
//                         <HowToRegIcon fontSize='small' />
//                         <span className={`${styles.repositoryManagementSubTabsTextSpan}`}>
//                             {language === 'en' ? 'Clear' : AdminTranslation["Clear"]}
//                         </span>
//                     </ToggleButton>
//                     <ToggleButton value="Backup" aria-label="Backup" className={`${styles.repositoryManagementSubTabs}`} >
//                         <BackupIcon fontSize='small' />
//                         <span className={`${styles.repositoryManagementSubTabsTextSpan}`}>
//                             {language === 'en' ? 'Backup' : AdminTranslation["Backup"]}
//                         </span>
//                     </ToggleButton>
//                     <ToggleButton value="Restore" aria-label="Restore" className={`${styles.repositoryManagementSubTabs}`} >
//                         <RestoreIcon fontSize='small' />
//                         <span className={`${styles.repositoryManagementSubTabsTextSpan}`}>
//                             {language === 'en' ? 'Restore' : AdminTranslation["Restore"]}
//                         </span>
//                     </ToggleButton>
//                 </ToggleButtonGroup> */}


//                 <Box className={styles.tabContent}>
//                 {repositorytab === "Clear" ? (
//                     <>
//                     <Box className={styles.repositoryManagementSubButtonsGroup}>
//                         <Box className={styles.repositoryManagementSubButtonsParentBox}>
//                         <CustomButton
//                             className={styles.repositoryManagementSubButtons}
//                             title={language === 'en' ? 'Object' : AdminTranslation["Object"]}
//                             variant="outlined"
//                             buttonTitleColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                             buttonBorderColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                             loading={false}
//                             disabled={false}
//                             fullWidth={true}
//                             loaderSize={25}
//                             loaderColor="success"
//                             loaderThickness={5}
//                             startIcon={<DeleteIcon />}
//                         />
//                         </Box>
//                         {/* Other CustomButton components */}
//                     </Box>
//                     </>
//                 ) : (
//                     repositorytab === "Backup" ? (
//                     <Box className={styles.repositoryManagementSubButtonsGroup}>
//                         {language === 'en' ? 'Backup' : AdminTranslation["Backup"]}
//                     </Box>
//                     ) : (
//                     <Box className={styles.repositoryManagementSubButtonsGroup}>
//                         {language === 'en' ? 'Restore' : AdminTranslation["Restore"]}
//                     </Box>
//                     )
//                 )}
//                 </Box>

                

//                 {
//                     (repositorytab === "Clear") ?
//                         <Box className={styles.repositoryManagementSubButtonsGroup}>
//                             <Box className={styles.repositoryManagementSubButtonsParentBox}>
//                                 <CustomButton
//                                     className={styles.repositoryManagementSubButtons}
//                                     title={language === 'en' ? 'Object' : AdminTranslation["Object"]}
//                                     variant="outlined"
//                                     buttonTitleColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                     buttonBorderColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                     loading={false}
//                                     disabled={false}
//                                     fullWidth={true}
//                                     loaderSize={25}
//                                     loaderColor="success"
//                                     loaderThickness={5}
//                                     startIcon={<DeleteIcon />}
//                                 />
//                             </Box>
//                             <Box className={styles.repositoryManagementSubButtonsParentBox}>
//                                 <CustomButton
//                                     className={styles.repositoryManagementSubButtons}
//                                     title={language === 'en' ? 'Model' : AdminTranslation["Model"]}
//                                     variant="outlined"
//                                     buttonTitleColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                     buttonBorderColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                     loading={false}
//                                     disabled={false}
//                                     fullWidth={true}
//                                     loaderSize={25}
//                                     loaderColor="success"
//                                     loaderThickness={5}
//                                     startIcon={<DeleteIcon />}
//                                 />
//                             </Box>
//                             <Box className={styles.repositoryManagementSubButtonsParentBox}>
//                                 <CustomButton
//                                     className={styles.repositoryManagementSubButtons}
//                                     title={language === 'en' ? 'Attachment' : AdminTranslation["Attachment"]}
//                                     variant="outlined"
//                                     buttonTitleColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                     buttonBorderColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                     loading={false}
//                                     disabled={false}
//                                     fullWidth={true}
//                                     loaderSize={25}
//                                     loaderColor="success"
//                                     loaderThickness={5}
//                                     startIcon={<DeleteIcon />}
//                                 />
//                             </Box>
//                             <Box className={styles.repositoryManagementSubButtonsParentBox}>
//                                 <CustomButton
//                                     className={styles.repositoryManagementSubButtons}
//                                     title={language === 'en' ? 'Dashboard' : AdminTranslation["Dashboard"]}
//                                     variant="outlined"
//                                     buttonTitleColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                     buttonBorderColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                     loading={false}
//                                     disabled={false}
//                                     fullWidth={true}
//                                     loaderSize={25}
//                                     loaderColor="success"
//                                     loaderThickness={5}
//                                     startIcon={<DeleteIcon />}
//                                 />
//                             </Box>
//                         </Box>
//                         : (repositorytab === "Backup") ?
//                             <Box className={styles.repositoryManagementSubButtonsGroup}>
//                                 {language === 'en' ? 'Backup' : AdminTranslation["Backup"]}
//                             </Box> :
//                             <Box className={styles.repositoryManagementSubButtonsGroup}>
//                                 {language === 'en' ? 'Restore' : AdminTranslation["Restore"]}
//                             </Box>
//                 }

//             </Box>
//         </>
//     )
// }

// const mapStateToProps = state => {
//     return {
//         language: state.language,
//         theme: state.theme
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         setLanguage: (lang) => {
//             return dispatch({
//                 type: "TOGGLELANG",
//                 value: (lang === 'en') ? 'ar' : "en"
//             })
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(RepositoryManagement);



 // testing *****
// import React from 'react';
// // import { connect } from 'react-redux';
// import { Box } from '@mui/material'

// import DeleteIcon from '@mui/icons-material/Delete';
// import styles from './RepositoryManagement.module.css';
// import CustomButton from '../../../components/CustomButton/CustomButton';
// import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
// import CustomTabs from '../../../components/CustomTabs/CustomTabs';

// const RepositoryTabs = ({ language, theme, repositorytab, handleRepositorytab }) => {
   

//     return (
//         <CustomTabs value={repositorytab} onChange={handleRepositorytab} tabs={repositorytab} />
//     );
// };

// const RepositoryContent = ({ repositorytab, language, theme }) => {
//     return (
//         <Box className={styles.tabContent}>
//             {repositorytab === "Clear" ? (
//                 <>
//                     <Box className={styles.repositoryManagementSubButtonsGroup}>
//                         <Box className={styles.repositoryManagementSubButtonsParentBox}>
//                             <CustomButton
//                                 className={styles.repositoryManagementSubButtons}
//                                 title={language === 'en' ? 'Object' : AdminTranslation["Object"]}
//                                 variant="outlined"
//                                 buttonTitleColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                 buttonBorderColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
//                                 loading={false}
//                                 disabled={false}
//                                 fullWidth={true}
//                                 loaderSize={25}
//                                 loaderColor="success"
//                                 loaderThickness={5}
//                                 startIcon={<DeleteIcon />}
//                             />
//                         </Box>
//                         {/* Other CustomButton components */}
//                     </Box>
//                 </>
//             ) : (
//                 repositorytab === "Backup" ? (
//                     <Box className={styles.repositoryManagementSubButtonsGroup}>
//                         {language === 'en' ? 'Backup' : AdminTranslation["Backup"]}
//                     </Box>
//                 ) : (
//                     <Box className={styles.repositoryManagementSubButtonsGroup}>
//                         {language === 'en' ? 'Restore' : AdminTranslation["Restore"]}
//                     </Box>
//                 )
//             )}
//         </Box>
//     );
// };
// export {RepositoryTabs, RepositoryContent}

import React from 'react';
// import CustomButton from '../../../components/CustomButton/CustomButton';
import { Box } from '@mui/material';

// import { connect } from 'react-redux';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import LockIcon from '@mui/icons-material/Lock';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "./RepositoryManagement.module.css";

// import UserRegistration from './UserRegistration';
// import PasswordManagement from './PasswordManagement';
// import ActiveDirectoryUser from './ActiveDirectoryUser';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';



function RepositoryTabs(props) {
  
  const { value, handleChange, tabs} = props; // Destructure props

  return (
    <CustomTabs value={value} onChange={handleChange} tabs={tabs} /> // Render CustomTabs component with props
  );
}

function RepositoryContent(props) {
  const { language,  value  } = props; // Destructure props

  return (

    <Box className={styles.tabContent}>
    {value === 0 && (language === 'en' ? 'Clear' : AdminTranslation["Clear"])}
    {value === 1 && (language === 'en' ? 'Backup' : AdminTranslation["Backup"])}    
    {value === 2 && (language === 'en' ? 'Restore' : AdminTranslation["Restore"])} 

    </Box>
    

    
  );
}


export {RepositoryTabs, RepositoryContent}
