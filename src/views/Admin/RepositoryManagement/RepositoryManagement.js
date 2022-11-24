import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './RepositoryManagement.module.css';
import { Box } from '@mui/material'

const RepositoryManagement = (props) => {

    let { language, theme } = props;
    console.log("test11:", props)

    return (
        <>
            <Box className={styles.main}>

                <Button variant="outlined" className={`${styles.repositoryManagementMainButton}`}
                    sx={{
                        color: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a "),
                        borderColor: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a ")
                    }}>
                    {language === 'en' ? 'Clear' : 'صافي'}
                </Button>

                <Box className={styles.repositoryManagementSubButtonsGroup}>
                    <Button variant="outlined" sx={{
                        color: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a "),
                        borderColor: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a ")
                    }} startIcon={<DeleteIcon />}>
                        {language === 'en' ? 'Object' : 'هدف'}
                    </Button>
                    <Button variant="outlined" className={styles.repositoryManagementSubButtons} sx={{
                        color: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a "),
                        borderColor: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a ")
                    }} startIcon={<DeleteIcon />}>
                        {language === 'en' ? 'Model' : 'نموذج'}
                    </Button>
                    <Button variant="outlined" className={styles.repositoryManagementSubButtons} sx={{
                        color: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a "),
                        borderColor: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a ")
                    }} startIcon={<DeleteIcon />}>
                        {language === 'en' ? 'Attachment' : 'التعلق'}
                    </Button>
                    <Button variant="outlined" className={styles.repositoryManagementSubButtons} sx={{
                        color: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a "),
                        borderColor: (theme === "default" ? "#0d7e8a" : theme === "light" ? "#6d7175" : "#0d7e8a ")
                    }} startIcon={<DeleteIcon />}>
                        {language === 'en' ? 'Dashboard' : 'لوحة القيادة'}
                    </Button>
                </Box>
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