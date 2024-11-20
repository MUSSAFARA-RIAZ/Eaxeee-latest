import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png"

const ModalAddPool = ({ open, handleClose, language, theme }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [role, setRole] = useState('');
    const [snackBarFlag, setSnackBarFlag] = useState(false);
    let snackBarMessage = "";

    const handleSnackBarClose = () => {
        setSnackBarFlag(false);
    };
    const onSubmit = (data) => {
        const { poolName, poolRole } = data;

        if (!poolName) {
            snackBarMessage = "Pool Name is required";
            setSnackBarFlag(true);
            handleClose();
        } else if (!poolRole) {
            snackBarMessage = "Pool Role is required";
            setSnackBarFlag(true);
            handleClose();
        } else {
            // Handle the form submission logic here
            handleClose(); // Close the dialog
        }
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
                            {language === 'en' ? 'Add Pool' : AdminTranslation["Add Pool"]}
                        </Typography>
                    </Box>

                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "50%", // Center vertically
                            right: "10px", // Padding from the right edge
                            transform: "translateY(-50%)", // Correct vertical alignment
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
                    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '15px 0' }}>
                        <TextField
                            name="poolName"
                            type="text"
                            label={language === 'en' ? 'Pool Name' : AdminTranslation["Pool Name"]}
                            autoComplete="off"
                            fullWidth
                            size="small"
                            placeholder='Name must be unique'
                            {...register('poolName', {
                                pattern: /^[A-Za-z]+$/i,
                                required: true,
                            })}
                        />
                        {errors.poolName && (
                            <Box sx={{ color: 'red', fontSize: 'smaller', textAlign: 'left' }}>
                                {language === 'en' ? (errors.poolName.type === "required" ? 'This is a required field' : 'Special characters are not allowed') : (errors.poolName.type === "required" ? AdminTranslation["This is a required field"] : AdminTranslation["Special characters are not allowed"])}
                            </Box>
                        )}
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel id="pool-role-label">{language === 'en' ? 'Pool Role' : AdminTranslation["Pool Role"]}</InputLabel>
                            <Select
                                labelId="pool-role-label"
                                id="pool-role"
                                value={role}
                                label={language === 'en' ? 'Pool Role' : AdminTranslation["Pool Role"]}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value={"Architect"}>{language === 'en' ? 'Architect' : AdminTranslation["Architect"]}</MenuItem>
                                <MenuItem value={"Repository Admin"}>{language === 'en' ? 'Repository Admin' : AdminTranslation["Repository Admin"]}</MenuItem>
                                <MenuItem value={"Organization Portal"}>{language === 'en' ? 'Organization Portal' : AdminTranslation["Organization Portal"]}</MenuItem>
                            </Select>
                        </FormControl>
                        {errors.poolRole && (
                            <Box sx={{ color: 'red', fontSize: 'smaller', textAlign: 'left' }}>
                                {language === 'en' ? 'This is a required field' : AdminTranslation["This is a required field"]}
                            </Box>
                        )}


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
                                title={language === 'en' ? 'Add' : AdminTranslation["Add"]}
                                type="submit"
                                Theme={theme}
                                onClick={handleSubmit(onSubmit)}
                            />
                            <CustomButton
                                title={language === 'en' ? 'Cancel' : AdminTranslation["Cancel"]}
                                type="submit"
                                Theme={theme}
                                onClick={handleClose}
                            />
                        </Box>
                    </form>
                </DialogContent>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddPool);
