import React, { useState, useRef } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { connect } from 'react-redux';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png";

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

    const isRTL = language === "ar";

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
                        padding: "3px 16px",
                        display: "flex",
                        alignItems: "center", // Align items vertically in the center
                        justifyContent: "space-between", // Space out the content
                        position: "relative", // Required for absolute positioning of the close icon
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={GreenEaxee}
                            alt="img"
                            style={{ width: "40px", height: "40px", marginRight: "5px" }}
                        />
                        <Typography variant="h6">
                            {language === 'en' ? 'Add License' : AdminTranslation["Add License"]}
                        </Typography>
                    </Box>

                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "50%", // Center vertically
                            transform: "translateY(-50%)", // Correct vertical alignment
                            color: "#cecece",
                            [language === 'ar' ? 'left' : 'right']: 0
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent
                    sx={{
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
                        color: theme === 'default' ? '#414849' : theme === 'light' ? '#414849' : '#cecece',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center', // Align vertically
                            margin: '16px 0',
                            gap: '8px',
                        }}
                    >
                        <Typography variant="body1" sx={{ flexShrink: 0 }}>
                            {language === 'en' ? 'License File:' : AdminTranslation["License File:"]}
                        </Typography>
                        <TextField
                            name="poolName"
                            type="text"
                            autoComplete="off"
                            fullWidth
                            size="small"
                            value={selectedFile || ''}
                            placeholder={language === 'en' ? 'No file chosen' : AdminTranslation["No file chosen"]}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{
                                mt: 0, // Remove margin-top to avoid vertical shift
                                direction: isRTL ? "rtl" : "ltr", // RTL text input
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        textAlign: isRTL ? "right" : "left", // Align text to right in RTL
                                    },
                                    "&:hover fieldset": {
                                        textAlign: isRTL ? "right" : "left", // Hover color
                                    },
                                    "&.Mui-focused fieldset": {
                                        textAlign: isRTL ? "right" : "left", // Focus color
                                    },
                                    "& input::placeholder": {
                                        textAlign: isRTL ? "right" : "left", // Placeholder color
                                    },
                                    "& input": {
                                        textAlign: isRTL ? "right" : "left", // Ensure the text inside input is aligned correctly for RTL
                                    },
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    transformOrigin: isRTL ? "top right" : "top left", // Align label origin to the right for RTL
                                    textAlign: isRTL ? "right" : "left", // Label alignment based on direction
                                    right: isRTL ? 24 : "auto", // Ensure it moves to the right in RTL
                                },
                            }}
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

                    <Box
                        sx={{
                            display: "flex",
                            // Distribute buttons evenly
                            gap: "10px",
                            marginTop: "16px",
                            justifyContent:"flex-end",
                        }}
                    >
                        <CustomButton
                            title={language === "en" ? "Upload" : AdminTranslation["Upload"]}
                            type="submit"
                            Theme={theme}
                            sx={{ width: "50%" }}
                        />
                        <CustomButton
                            title={language === "en" ? "Cancel" : AdminTranslation["Cancel"]}
                            type="button"
                            Theme={theme}
                            onClick={handleClose}
                            sx={{ width: "50%" }}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (lang) => {
            return dispatch({
                type: "TOGGLELANG",
                value: (lang === 'en') ? 'ar' : "en"
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddLicense);
