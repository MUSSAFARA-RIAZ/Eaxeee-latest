import React from 'react';
// import { connect } from 'react-redux';
import { Box } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import styles from './LicenseManagement.module.css';



function LicenseManagementTabs(props){
    const { value, handleChange, tabs } = props; // Destructure props

  return (
    <CustomTabs value={value} onChange={handleChange} tabs={tabs} /> // Render CustomTabs component with props
  );
}
function  LicenseManagementContent(props){
    const { language, value  } = props;
    return (
        <Box className={styles.licenseManagementSubButtonsGroup}>
        {value === 0 && (language === 'en' ? 'Named Usersss' : AdminTranslation["Named User"])}
        {value === 1 && (language === 'en' ? 'Concurrent User' : AdminTranslation["Concurrent User"])}                
    </Box>
    )
    // const [value, setValue] = useState(0);

    // const handleLicensetab = (event, newValue) => {
    //     if (newValue) {
    //         setValue(newValue);
    //     }
    // };

    // const tabs = [
    //     { label: language === 'en' ? 'Named User' : AdminTranslation["Named User"], icon: <AccountCircleIcon fontSize='small' /> },
    //     { label: language === 'en' ? 'Concurrent User' : AdminTranslation["Concurrent User"], icon: <SupervisedUserCircleIcon fontSize='small' /> }
    // ];

   
}

// const mapStateToProps = state => ({
//     language: state.language,
//     theme: state.theme
// });


// const mapDispatchToProps = dispatch => ({
//     setLanguage: (lang) => dispatch({
//         type: "TOGGLELANG",
//         value: lang === 'en' ? 'ar' : 'en'
//     })
// });
export {LicenseManagementTabs,LicenseManagementContent}


// export default connect(mapStateToProps, mapDispatchToProps)(LicenseManagement);

