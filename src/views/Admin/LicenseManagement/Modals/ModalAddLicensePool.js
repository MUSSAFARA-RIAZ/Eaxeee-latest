import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, IconButton, Typography } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png"

const ModalAddLicensePool = ({ open, handleClose, language, theme }) => {


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
        { id: '1', licenseId: 'conFAUyLzmUl8YzV3ub006', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },
        { id: '2', licenseId: 'conWG0t3tnTCO4oIPI0009', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commerical' },
        { id: '3', licenseId: 'conColK5I5if8V1YhEM010', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },
        { id: '4', licenseId: 'conFf7A5TJercvCiNo0013', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },
        { id: '5', licenseId: 'conFf7A5TJercvCiNo0013', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },
        { id: '6', licenseId: 'conFf7A5TJercvCiNo0013', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },
        { id: '7', licenseId: 'conFf7A5TJercvCiNo0013', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },
        { id: '8', licenseId: 'conFf7A5TJercvCiNo0013', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },
        { id: '9', licenseId: 'conFf7A5TJercvCiNo0013', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },
        { id: '10', licenseId: 'conFf7A5TJercvCiNo0013', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },
        { id: '11', licenseId: 'conFf7A5TJercvCiNo0013', role: 'Organizational Portal', startDate: '2022-05-10', endDate: '2075-01-05', licenseType: 'Commercial' },

    ];

    const columns = [
        { field: 'licenseId', headerName: language === 'en' ? 'License ID' : AdminTranslation["License ID"], flex: 1 },
        { field: 'role', headerName: language === 'en' ? 'License Role' : AdminTranslation["License Role"], flex: 1 },
        { field: 'startDate', headerName: language === 'en' ? 'Start Date' : AdminTranslation["Start Date"], flex: 1 },
        { field: 'endDate', headerName: language === 'en' ? 'End Date' : AdminTranslation["End Date"], flex: 1 },
        { field: 'licenseType', headerName: language === 'en' ? 'License Type' : AdminTranslation["License Type"], flex: 1 },
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
                        {language === 'en' ? 'Add License' : AdminTranslation["Add License"]}
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
                        padding:"10px"
                        
                    }}
                >
            
                    <CustomTable 
                        rows={updatedRows} 
                        columns={columns} 
                        showDeleteButton={true}
                        Theme={theme}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddLicensePool);
