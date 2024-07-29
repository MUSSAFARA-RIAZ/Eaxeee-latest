import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Snackbar, Alert, IconButton } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';

const ModalDeleteAlert = ({ open, handleClose, deleteTarget, language, theme }) => {
    const [snackBarFlag, setSnackBarFlag] = useState(false);

    const handleYes = () => {           
        handleClose();
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
                        width: "400px", 
                        maxWidth: "90%", 
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
                    {language === 'en' ? 'Delete' : AdminTranslation["delete"]}
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
                    <Typography
                        variant="h3"
                        sx={{
                            mt: 2,
                            fontSize: 'medium',
                        }}
                    >
                        {language === 'en' ? `Are you sure you want to delete the ${deleteTarget}?` : AdminTranslation[`Are you sure you want to delete the ${deleteTarget}?`]}
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
                    {`Deleted ${deleteTarget} successfully!`}
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

export default connect(mapStateToProps)(ModalDeleteAlert);
