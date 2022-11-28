import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, ToggleButtonGroup } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled } from "@mui/material/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import styles from './LicenseManagement.module.css';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';

const LicenseManagement = (props) => {

    let { language, theme } = props;
    console.log("test11:", props)
    const [licensetab, setLicensetab] = useState('Named User');

    const handleLicensetab = (event, newLicensetab) => {
        if (newLicensetab) {
            setLicensetab(newLicensetab);
        }
    };

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: (props.theme === "default" ? `#ffff` : props.theme === 'light' ? '#6d7175' : "#ffff "),
            backgroundColor: (props.theme === "default" ? `#0d7e8a` : props.theme === 'light' ? '#dee1e6' : "#063f45"),
        }
    });


    return (
        <>
            <Box className={styles.main}>

                <ToggleButtonGroup
                    value={licensetab}
                    exclusive
                    onChange={handleLicensetab}
                    className={`${styles.licenseManagementSubTabsGroup}`}
                >
                    <ToggleButton value="Named User" aria-label="Named User" className={`${styles.licenseManagementSubTabs}`} >
                        <AccountCircleIcon fontSize='small' />
                        <span className={`${styles.licenseManagementSubTabsTextSpan}`}>
                            {language === 'en' ? 'Named User' : AdminTranslation["Named User"]}
                        </span>
                    </ToggleButton>
                    <ToggleButton value="Concurrent User" aria-label="Concurrent User" className={`${styles.licenseManagementSubTabs}`} >
                        <SupervisedUserCircleIcon fontSize='small' />
                        <span className={`${styles.licenseManagementSubTabsTextSpan}`}>
                            {language === 'en' ? 'Concurrent User' : AdminTranslation["Concurrent User"]}
                        </span>
                    </ToggleButton>
                </ToggleButtonGroup>

                {
                    (licensetab === "Named User") ?
                        <Box className={styles.licenseManagementSubButtonsGroup}>
                            {language === 'en' ? 'Named User' : AdminTranslation["Named User"]}
                        </Box>
                        :
                        <Box className={styles.licenseManagementSubButtonsGroup}>
                            {language === 'en' ? 'Concurrent User' : AdminTranslation["Concurrent User"]}
                        </Box>
                }

            </Box>
        </>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (lang) => {
            return dispatch({
                type: "TOGGLELANG",
                value: (lang === 'en') ? 'ar' : "en"
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LicenseManagement); 