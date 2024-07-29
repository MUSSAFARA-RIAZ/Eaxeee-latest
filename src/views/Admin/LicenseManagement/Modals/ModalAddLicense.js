import React, { useState, useRef } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { connect } from 'react-redux';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';

const ModalAddLicense = ({ open, handleClose, language, theme }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleLoadLicenseFile = () => {
        handleClose(); // Close the dialog
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/plain') {
            setSelectedFile(file.name);
        } else {
            alert('Please select a valid .txt file');
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            handleClose();
        }
    };

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                PaperProps={{
                    sx: { 
                        width: "500px", // Adjust the width here
                        maxWidth: "90%", // Ensure it doesn't exceed the viewport
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: theme === "default" ? "#2158a4" : theme === "dark" ? "#393a3a" : "",
                        color: "#cecece",
                        padding: "6px",
                        paddingLeft: "35px",
                    }}
                >
                    {language === 'en' ? 'Add License' : AdminTranslation["Add License"]}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            color: "#cecece",
                        }}
                        onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent
                    sx={{
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
                        color: theme === 'default' ? '#414849' : theme === 'light' ? '#414849' : '#cecece',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', margin: '16px 0', gap: '8px' }}>
                        <Typography variant="body1" sx={{ flexGrow: 1 }}>
                            {language === 'en' ? 'License File:' : AdminTranslation["License File:"]}
                        </Typography>
                        <TextField
                            value={selectedFile || ''}
                            placeholder={language === 'en' ? 'No file chosen' : AdminTranslation["No file chosen"]}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ flexGrow: 2 }}
                        />
                        <CustomButton
                            title={language === 'en' ? 'Browse...' : AdminTranslation["Browse..."]}
                            type="button"
                            variant="outlined"
                            Theme={theme}
                            onClick={handleBrowseClick}
                            sx={{ flexShrink: 0 }}
                        />
                        <input
                            type="file"
                            accept=".txt"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        mt: -3,
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
                    }}
                >
                    <CustomButton
                        title={language === 'en' ? 'Upload' : AdminTranslation["Upload"]}
                        type="button"
                        Theme={theme}
                        onClick={handleLoadLicenseFile}
                    />
                    <CustomButton
                        title={language === 'en' ? 'Cancel' : AdminTranslation["Cancel"]}
                        type="button"
                        Theme={theme}
                        onClick={handleClose}
                    />
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme
    }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddLicense);
