import React, { useState } from 'react'; 
import { ChromePicker } from 'react-color';
import {
    Box, Dialog, DialogTitle, DialogContent, DialogActions,
    IconButton, Typography, Slider, Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';

const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: break;
        }
        h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

const ModalChangeColor = ({ open, onClose, language, theme , onChangeColor}) => {
    const [color, setColor] = useState({ r: 68, g: 114, b: 196, a: 1 });
    const [hsl, setHsl] = useState(rgbToHsl(68, 114, 196));

    const handleColorChange = (color) => {
        setColor(color.rgb);
        setHsl(rgbToHsl(color.rgb.r, color.rgb.g, color.rgb.b));
    };

    const handleAlphaChange = (e, newValue) => {
        setColor({ ...color, a: newValue });
    };

    const handleDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            onClose();
        }
    };

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                PaperProps={{
                    sx: {
                        width: "500px",
                        maxWidth: "100%",
                        borderRadius: "10px",
                       
           
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: theme === "default" ? "#2158a4"
                            : theme === "light" ? "#cbd0d7" : "#393a3a",
                        color: "#cecece",
                        padding: "8px 24px",
                    }}
                >
                    {language === 'en' ? 'Change Color' : AdminTranslation["Change Color"]}
                    <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8, color: "#ffffff" }}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ backgroundColor: "#f5f5f5", padding: "20px", overflowY:"hidden", overflowX:"hidden",  }}>
                    {/* Color Picker */}
                    {/* <Paper elevation={3} sx={{ padding: "10px", backgroundColor: "transparent", marginBottom: "10px", width: "100%", border:"2px solid yellow" }}> */}
                        <Box sx={{ width: "100%", marginTop:"5px" }}>
                            <ChromePicker
                                color={color}
                                onChange={handleColorChange}
                                disableAlpha={false}
                                width="100%"
                            />
                        </Box>
                 

                    {/* Transparency Slider */}
                    <Typography variant="body2" gutterBottom>
                        Transparency: {`${Math.round(color.a * 100)}%`}
                    </Typography>
                    <Slider
                        value={color.a}
                        onChange={handleAlphaChange}
                        min={0}
                        max={1}
                        step={0.01}
                        valueLabelDisplay="auto"
                    />

                    {/* Color Preview */}
                    <Box sx={{ marginTop: "8px" }}>
                        <Typography variant="body2" gutterBottom>Selected Color Preview:</Typography>
                        <Box sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                            borderRadius: "8px",
                            // border: "1px solid #ddd",
                        }} />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ backgroundColor: "#f5f5f5", padding: "8px 24px" }}>
                    <CustomButton
                        title={language === 'en' ? 'Change' : AdminTranslation["Change"]}
                        onClick={() => onChangeColor(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`)}
                        Theme={theme}
                    />
                    <CustomButton
                        title={language === 'en' ? 'Cancel' : AdminTranslation["Cancel"]}
                        onClick={onClose}
                        Theme={theme}
                    />
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ModalChangeColor;
