import React, { useState } from 'react';
import {
    Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert,
    TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Typography
} from '@mui/material';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png"
import { createPool } from '../../../../apis/license_management';

const ModalAddPool = ({ open, handleClose, language, theme }) => {
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [role, setRole] = useState('');
    const [snackBarFlag, setSnackBarFlag] = useState(false);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
    let snackBarMessage = "";
    // console.log("value in register: ",register)
    const handleSnackBarClose = () => {
        setSnackBarFlag(false);
    };
    const onSubmit = async (data) => {
        setIsAddButtonDisabled(true)
        const poolName= data.poolName;
        const poolRole= role;

        console.log("poolName: ",poolName)
        console.log("poolRole: ",poolRole)
        if (!poolName) {
            alert("PoolName is required")
            snackBarMessage = "Pool Name is requiredd";
            setSnackBarFlag(true);
        } else if (!poolRole) {
            alert("poolRole is required")
            snackBarMessage = "Pool Role is required";
            setSnackBarFlag(true);
        } else {
            const res = await createPool(poolName, poolRole)
            if (res.code === 200){
                alert("Pool created successfully")
                handleClose(); // Close the dialog
                reset({ poolName: '' });
            }else{
                alert(res.error)
            }
            // Handle the form submission logic here
            
        }
        setIsAddButtonDisabled(false)


        
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
                            placeholder={language === 'en' ? 'Name must be unique' : AdminTranslation["Name must be unique"]}
                            {...register('poolName', {
                                pattern: /^[A-Za-z]+$/i,
                                required: true,
                            })}
                            sx={{
                                mt: 2,
                                direction: isRTL ? "rtl" : "ltr", // RTL text input
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        textAlign: isRTL ? "right" : "left", // Align text to right in RTL
                                    },
                                    "&:hover fieldset": {
                                        // borderColor: "dialogInputfield.main",
                                        textAlign: isRTL ? "right" : "left", // Hover color
                                    },
                                    "&.Mui-focused fieldset": {
                                        // borderColor: "dialogInputfield.main",
                                        textAlign: isRTL ? "right" : "left", // Focus color
                                    },
                                    "& input::placeholder": {
                                        // color: "inputlabelcolor.main",
                                        textAlign: isRTL ? "right" : "left", // Placeholder color
                                    },
                                    "& input": {
                                        // color: "inputfieldTextColor.main", // Text color when typing
                                        textAlign: isRTL ? "right" : "left", // Ensure the text inside input is aligned correctly for RTL
                                    },
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    transformOrigin: isRTL ? "top right" : "top left", // Align label origin to the right for RTL
                                    "&.Mui-focused": {
                                        // color: "dialogInputfield.main", // Focused label color
                                    },
                                    textAlign: isRTL ? "right" : "left", // Label alignment based on direction
                                    right: isRTL ? 24 : "auto", // Ensure it moves to the right in RTL
                                },
                            }}
                        />
                        {errors.poolName && (
                            <Box sx={{ color: 'red', fontSize: 'smaller', textAlign: 'left' }}>
                                {language === 'en' ? (errors.poolName.type === "required" ? 'This is a required field' : 'Special characters are not allowed') : (errors.poolName.type === "required" ? AdminTranslation["This is a required field"] : AdminTranslation["Special characters are not allowed"])}
                            </Box>
                        )}
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel id="pool-role-label" sx={{
                                transformOrigin: isRTL ? 'top right' : 'top left',
                                textAlign: isRTL ? 'right' : 'left',
                                right: isRTL ? 24 : 'auto',
                                "&.Mui-focused": {
                                    color: "dialogInputfield.main", // Focused label color
                                },
                            }}>{language === 'en' ? 'Pool Role' : AdminTranslation["Pool Role"]}</InputLabel>
                            <Select
                                labelId="pool-role-label"
                                id="pool-role"
                                value={role}
                                label={language === 'en' ? 'Pool Role' : AdminTranslation["Pool Role"]}
                                onChange={(e) => setRole(e.target.value)}
                                sx={{
                                    "& .MuiSelect-select": {
                                        textAlign: isRTL ? 'right' : 'left', // Ensure text is aligned based on direction
                                        color: "inputfieldTextColor.main", // Text color
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        textAlign: isRTL ? 'right' : 'left', // Align the outline label
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "dialogInputfield.main", // Hover effect
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "dialogInputfield.main", // Focused outline color
                                    },
                                    // Move the icon to the left for RTL layout
                                    "& .MuiSelect-icon": {
                                        right: isRTL ? 'unset' : 0,
                                        left: isRTL ? 0 : 'unset',
                                    },
                                }}
                            >
                                <MenuItem value={"ROLE_USER"}>{language === 'en' ? 'Architect' : AdminTranslation["Architect"]}</MenuItem>
                                <MenuItem value={"ROLE_ADMIN"}>{language === 'en' ? 'Repository Admin' : AdminTranslation["Repository Admin"]}</MenuItem>
                                <MenuItem value={"ROLE_ORGANIZATION_PORTAL"}>{language === 'en' ? 'Organization Portal' : AdminTranslation["Organization Portal"]}</MenuItem>
                                <MenuItem value={"METAMODELER"}>{language === 'en' ? 'Metamodeler' : AdminTranslation["Organization Portal"]}</MenuItem>
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
                disabled={isAddButtonDisabled}

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
