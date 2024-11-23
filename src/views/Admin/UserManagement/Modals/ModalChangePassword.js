import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Snackbar, Alert, IconButton } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png"

const ModalChangePassword = ({ open, handleClose, language, theme }) => {
    const [snackBarFlag, setSnackBarFlag] = useState(false);

    const handleYes = () => {
        // Add your logic for password change confirmation here              
        handleClose(); // Close the dialog
        setSnackBarFlag(true);
    };

    const handleSnackBarClose = () => {
        setSnackBarFlag(false);
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
                        width: "400px", // Adjust the width here
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
                    <Box sx={{ display: "flex", alignItems: "center" }}> {/* Flex for logo and title */}
                        <img
                            src={GreenEaxee}
                            alt="img"
                            style={{ width: "40px", height: "40px", marginRight: "5px" }}
                        />
                        <Typography variant="h6">
                            {language === 'en' ? 'Change Password' : AdminTranslation["Change Password"]}
                        </Typography>
                    </Box>

                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "50%", // Center vertically
                            // right: "10px", // Padding from the right edge
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
                    <Typography
                        variant="h3"
                        sx={{
                            mt: 2,
                            fontSize: 'medium',
                        }}
                    >
                        {language === 'en' ? 'Are you sure you want to change the password?' : AdminTranslation["Are you sure you want to change the password?"]}
                    </Typography>
                </DialogContent>

                <DialogActions
                    sx={{
                        mt: -3,
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
                    }}
                >
                    <CustomButton
                        title={language === 'en' ? 'Yes' : AdminTranslation["Yes"]}
                        type="submit"
                        onClick={handleYes}
                        Theme={theme}
                    />
                    <CustomButton
                        title={language === 'en' ? 'No' : AdminTranslation["No"]}
                        type="submit"
                        onClick={handleClose}
                        Theme={theme}
                    />
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackBarFlag}
                autoHideDuration={1500}
                onClose={handleSnackBarClose}
            >
                <Alert severity="success">
                    Password changed successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalChangePassword);
