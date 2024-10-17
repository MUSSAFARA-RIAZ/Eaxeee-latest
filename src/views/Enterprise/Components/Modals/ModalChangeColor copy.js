import React, { useState } from 'react';
import {
    Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert,
    IconButton, Grid
} from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';

const ModalChangeColor = ({ open, handleClose, language, theme, onChangeColor }) => {
    const [activeColor, setActiveColor] = useState('');
    const colors = ["#FF3333", "#FF9933", "#FFFF33", "#33FF99", "#33FFFF", "#3399FF", "#3333FF", "#9933FF", "#E533FF", "#FF3399", "#FF6666"

        , "#FFB266", "#FFFF66", "#66FFB2", "#66FFFF", "#66B2FF", "#6666FF", "#B266FF", "#E566FF", "#FF66B2", "#FF9999", "#FFCC99", "#FFFF99",
        "#FFCC99", "#FFFF99", "#99FFFF", "#99CCFF", "#9999FF", "#CC99FF", "#E599FF", "#FF99CC", "#FFCCCC", "#FFE5CC", "#FFFFCC", "#CCFFE5",
        "#CCFFFF", "#CCE5FF", "#CCCCFF", "#E5CCFF", "#EFCC35"
    ]

    //   const colors = ["#F28B82", "#FBBC04", "#FFF475", "#CCFF90", "#A7FFEB", "#CBF0F8", "#AECBFA", "#D7AEFB", "#FDCFE8"];

    const handleColorClick = (color) => {
        setActiveColor(color);  // Set the selected color
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
                        backgroundColor: theme === "default"
                            ? "#2158a4"
                            : theme === "light"
                                ? "#cbd0d7"
                                : "#393a3a",
                        color: "#cecece",
                        padding: "6px",
                        paddingLeft: "35px",
                    }}
                >
                    {language === 'en' ? 'Change Color' : AdminTranslation["Change Color"]}
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
                    {/* Grid of Color Options */}
                    <Box sx={{  marginTop:"10px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {colors.map((color) => (
                            <Box
                                key={color}
                                sx={{
                                    backgroundColor: color,
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer",
                                    border: activeColor === color ? '3px solid black' : 'none',
                                }}
                                onClick={() => handleColorClick(color)}
                            />
                        ))}
                    </Box>
                </DialogContent>


                <DialogActions
                    sx={{
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "#ffffff",
                        padding: "10px",
                        justifyContent: "flex-end",
                    }}
                >
                    <CustomButton
                        title={language === 'en' ? 'Change' : AdminTranslation["Change"]}
                        onClick={() => onChangeColor(activeColor)} // Pass the selected color back to the parent
                        Theme={theme}
                    />
                    <CustomButton
                        title={language === 'en' ? 'Cancel' : AdminTranslation["Cancel"]}
                        onClick={handleClose}
                        Theme={theme}
                    />
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const mapStateToProps = state => ({
    language: state.language,
    theme: state.theme,
});

export default connect(mapStateToProps)(ModalChangeColor);
