import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, IconButton } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';

const ModalAddBackup = ({ open, handleClose, language, theme, onAddBackup }) => {
    const [snackBarFlag, setSnackBarFlag] = useState(false);

    const handleSnackBarClose = () => {
        setSnackBarFlag(false);
    };

    const handleAddClick = () => {
        const backupName = prompt("Please enter the backup name:");
        if (backupName) {
            onAddBackup(backupName);
            setSnackBarFlag(true); // Show snackbar
            handleClose(); // Close the dialog
        }
    };

    const handleDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            handleClose();
        }
    };

    const updatedRows = [
        { id: '1', architectureName: 'Eaxee', creationDate: '2022-05-10' },
        { id: '2', architectureName: 'LambdaTheta', creationDate: '2022-05-11' },
        { id: '3', architectureName: 'FAST', creationDate: '2022-05-12' },
        { id: '4', architectureName: 'EaxeXe', creationDate: '2022-05-13' },
    ];

    const columns = [
        { field: 'architectureName', headerName: language === 'en' ? 'Architecture Name' : AdminTranslation["Architecture Name"], flex: 1 },
        { field: 'creationDate', headerName: language === 'en' ? 'Creation Date' : AdminTranslation["Creation Date"], flex: 1 },
    ];

    return (
        <Box>
            <Dialog 
                open={open}
                onClose={handleDialogClose}
                PaperProps={{
                    sx: { 
                        width: "900px", // Adjust the width here
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
                    {language === 'en' ? 'Create Backup' : AdminTranslation["Create Backup"]}
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
                            Theme={theme}
                            checkboxSelection={false}
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
                    Backup created successfully!
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

export default connect(mapStateToProps)(ModalAddBackup);
