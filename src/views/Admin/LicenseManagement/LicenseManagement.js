import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import CustomButton from '../../../components/CustomButton/CustomButton';
import NamedUser from './NamedUser';
import ConcurrentUser from './Concurrentnew';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import styles from './LicenseManagement.module.css';
import ModalAddLicense from './Modals/ModalAddLicense';



function LicenseManagementTabs(props){
    const { language, theme, value, handleChange, tabs } = props; // Destructure props

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleAddLicenseClick = () => {
      setOpenModal(true);
    }


  return (
    <Box className={`${styles.licenseManagementMainDiv}`}>
      {/* Render CustomTabs component with props */}
      <CustomTabs value={value} onChange={handleChange} tabs={tabs} /> 
      <Box className={`${styles.addLicenseButtonDiv}`}>
        <ModalAddLicense open={openModal} handleClose={handleCloseModal} /> 
        <CustomButton
          className="addLicense-button"
          title={language === 'en' ? 'Add License' : AdminTranslation["Add License"]}
          variant="outlined"
          Theme={props.theme}
          onClick={handleAddLicenseClick}
          type="submit"
          loading={false}
          disabled={false}
          fullWidth={true}
          loaderSize={25}
          loaderColor="success"
          loaderThickness={5}
          startIcon={<AddIcon />} 
          />
      </Box>
    </Box>
  );
}
function  LicenseManagementContent(props){
    const { language, value  } = props;
    return (
        <Box className={styles.licenseManagementSubButtonsGroup}>
          {value === 0 && <NamedUser />}
          {value === 1 && <ConcurrentUser />}                
        </Box>
    )
}

const mapStateToProps = state => ({
    language: state.language,
    theme: state.theme
});


const mapDispatchToProps = dispatch => ({
    setLanguage: (lang) => dispatch({
        type: "TOGGLELANG",
        value: lang === 'en' ? 'ar' : 'en'
    })
});

const LicenseManagementTabsConnected = connect(mapStateToProps, mapDispatchToProps)(LicenseManagementTabs);
const LicenseManagementContentConnected = connect(mapStateToProps, mapDispatchToProps)(LicenseManagementContent);

export { LicenseManagementTabsConnected as LicenseManagementTabs, LicenseManagementContentConnected as LicenseManagementContent };