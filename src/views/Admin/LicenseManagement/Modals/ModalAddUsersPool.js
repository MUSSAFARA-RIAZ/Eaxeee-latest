import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, IconButton, Typography } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png"


const ModalAddUsersPool = ({ open, handleClose, language, theme,users  }) => {
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

    // const updatedRows = [
    //     { id: '1', user: 'admin' },
    //     { id: '2', user: 'hammad' },
    //     { id: '3', user: 'ghazni' },
    //     { id: '4', user: 'user2' },
    //     { id: '5', user: 'user3' },
    //     { id: '6', user: 'Mahnoor' },
    //     { id: '7', user: 'Mussaffra' },
    //     { id: '8', user: 'user1' },
    //     { id: '9', user: 'maheen' },
    //     { id: '10', user: 'monir' },
    // ];

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

                            {language === 'en' ? 'Add Users' : AdminTranslation["Add Users"]}
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

                <Box
                    sx={{
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "#ffffff",
                        // border:"3px solid red",
                        padding: "10px"

                    }}
                >

                    <CustomTable
                        rows={users}
                        columns={columns}
                        showDeleteButton={true}

                        checkboxSelection={true}
                        height={true}
                    />

                    <DialogActions
                        sx={{
                            backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "#ffffff",
                        }}
                    >
                           <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",



                margin: "0px",
                position: "relative",
                top: "10px",


              }}
            >
              <CustomButton
                title={language === "en" ? "Add" : AdminTranslation["Add"]}
                type="submit"
                // onClick={handleUserSubmit}

                Theme={theme}
                sx={{ width: "50%" }}
              />
              <CustomButton
                title={
                  language === "en" ? "Cancel" : AdminTranslation["Cancel"]
                }
                type="button"
                Theme={theme}
                onClick={handleClose}
                sx={{ width: "50%" }}
              />
            </Box>
                    </DialogActions>
                </Box>
            </Dialog>

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