import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, IconButton } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';

const ModalAddUsersPool = ({ open, handleClose, language, theme }) => {
    const [snackBarFlag, setSnackBarFlag] = useState(false);

    const handleSnackBarClose = () => {
        setSnackBarFlag(false);
    };

    const handleAddClick = () => {
        setSnackBarFlag(true); // Show snackbar
        handleClose(); // Close the dialog
    };

    const handleDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            handleClose();
        }
    };

    const updatedRows = [
        { id: '1', user: 'admin' },
        { id: '2', user: 'hammad' },
        { id: '3', user: 'ghazni' },
        { id: '4', user: 'user2' },
        { id: '5', user: 'user3' },
        { id: '6', user: 'Mahnoor' },
        { id: '7', user: 'Mussaffra' },
        { id: '8', user: 'user1' },
        { id: '9', user: 'maheen' },
        { id: '10', user: 'monir' },
    ];

    const columns = [
        { field: 'user', headerName: language === 'en' ? 'Users' : AdminTranslation["Users"], flex: 1 },
    ];

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
                        backgroundColor: theme === "default"
                            ? "#2158a4"
                            : theme === "light"
                                ? "#cbd0d7"
                                : "#393a3a",
                        color: "#cecece",
                        padding: "6px",
                        paddingLeft: "35px",
                        position: 'relative',
                    }}
                >
                    {language === 'en' ? 'Add Users' : AdminTranslation["Add Users"]}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            color: "#cecece",
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent
                    sx={{
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "#ffffff",
                        color: theme === 'default' ? '#414849' : theme === 'light' ? '#414849' : '#cecece',
                    }}
                >
                    <div style={{ paddingTop: "23px" }}>
                        <CustomTable
                            rows={updatedRows}
                            columns={columns}
                            showDeleteButton={true}
                            Theme={theme}
                            checkboxSelection={true}
                        />
                    </div>
                </DialogContent>

                <DialogActions
                    sx={{
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "#ffffff",
                        mt: -3,
                        pt: 3
                    }}
                >
                    <CustomButton
                        title={language === 'en' ? 'Add' : AdminTranslation["Add"]}
                        type="submit"
                        Theme={theme}
                        onClick={handleAddClick}
                    />
                    <CustomButton
                        title={language === 'en' ? 'Cancel' : AdminTranslation["Cancel"]}
                        type="button"
                        Theme={theme}
                        onClick={handleClose}
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
                    Users added successfully!
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUsersPool);