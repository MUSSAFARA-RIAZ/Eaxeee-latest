import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, ToggleButtonGroup } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled } from "@mui/material/styles";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import BackupIcon from '@mui/icons-material/Backup';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './RepositoryManagement.module.css';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Button from '@mui/material/Button';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';

const RepositoryManagement = (props) => {

    let { language, theme } = props;
    console.log("test11:", props)
    const [repositorytab, setRepositorytab] = useState('Clear');

    const handleRepositorytab = (event, newRepositorytab) => {
        if (newRepositorytab) {
            setRepositorytab(newRepositorytab);
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
                    value={repositorytab}
                    exclusive
                    onChange={handleRepositorytab}
                    className={`${styles.repositoryManagementSubTabsGroup}`}
                >
                    <ToggleButton value="Clear" aria-label="Clear" className={`${styles.repositoryManagementSubTabs}`} >
                        <HowToRegIcon fontSize='small' />
                        <span className={`${styles.repositoryManagementSubTabsTextSpan}`}>
                            {language === 'en' ? 'Clear' : AdminTranslation["Clear"]}
                        </span>
                    </ToggleButton>
                    <ToggleButton value="Backup" aria-label="Backup" className={`${styles.repositoryManagementSubTabs}`} >
                        <BackupIcon fontSize='small' />
                        <span className={`${styles.repositoryManagementSubTabsTextSpan}`}>
                            {language === 'en' ? 'Backup' : AdminTranslation["Backup"]}
                        </span>
                    </ToggleButton>
                    <ToggleButton value="Restore" aria-label="Restore" className={`${styles.repositoryManagementSubTabs}`} >
                        <RestoreIcon fontSize='small' />
                        <span className={`${styles.repositoryManagementSubTabsTextSpan}`}>
                            {language === 'en' ? 'Restore' : AdminTranslation["Restore"]}
                        </span>
                    </ToggleButton>
                </ToggleButtonGroup>

                {
                    (repositorytab === "Clear") ?
                        <Box className={styles.repositoryManagementSubButtonsGroup}>
                            <Box className={styles.repositoryManagementSubButtonsParentBox}>
                                <CustomButton
                                    className={styles.repositoryManagementSubButtons}
                                    title={language === 'en' ? 'Object' : AdminTranslation["Object"]}
                                    variant="outlined"
                                    buttonTitleColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                                    buttonBorderColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                                    loading={false}
                                    disabled={false}
                                    fullWidth={true}
                                    loaderSize={25}
                                    loaderColor="success"
                                    loaderThickness={5}
                                    startIcon={<DeleteIcon />}
                                />
                            </Box>
                            <Box className={styles.repositoryManagementSubButtonsParentBox}>
                                <CustomButton
                                    className={styles.repositoryManagementSubButtons}
                                    title={language === 'en' ? 'Model' : AdminTranslation["Model"]}
                                    variant="outlined"
                                    buttonTitleColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                                    buttonBorderColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                                    loading={false}
                                    disabled={false}
                                    fullWidth={true}
                                    loaderSize={25}
                                    loaderColor="success"
                                    loaderThickness={5}
                                    startIcon={<DeleteIcon />}
                                />
                            </Box>
                            <Box className={styles.repositoryManagementSubButtonsParentBox}>
                                <CustomButton
                                    className={styles.repositoryManagementSubButtons}
                                    title={language === 'en' ? 'Attachment' : AdminTranslation["Attachment"]}
                                    variant="outlined"
                                    buttonTitleColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                                    buttonBorderColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                                    loading={false}
                                    disabled={false}
                                    fullWidth={true}
                                    loaderSize={25}
                                    loaderColor="success"
                                    loaderThickness={5}
                                    startIcon={<DeleteIcon />}
                                />
                            </Box>
                            <Box className={styles.repositoryManagementSubButtonsParentBox}>
                                <CustomButton
                                    className={styles.repositoryManagementSubButtons}
                                    title={language === 'en' ? 'Dashboard' : AdminTranslation["Dashboard"]}
                                    variant="outlined"
                                    buttonTitleColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                                    buttonBorderColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                                    loading={false}
                                    disabled={false}
                                    fullWidth={true}
                                    loaderSize={25}
                                    loaderColor="success"
                                    loaderThickness={5}
                                    startIcon={<DeleteIcon />}
                                />
                            </Box>
                        </Box>
                        : (repositorytab === "Backup") ?
                            <Box className={styles.repositoryManagementSubButtonsGroup}>
                                {language === 'en' ? 'Backup' : AdminTranslation["Backup"]}
                            </Box> :
                            <Box className={styles.repositoryManagementSubButtonsGroup}>
                                {language === 'en' ? 'Restore' : AdminTranslation["Restore"]}
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

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryManagement); 