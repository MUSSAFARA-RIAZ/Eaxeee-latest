import React, { useState } from "react";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
} from "@mui/material";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
import SolidLine from "../../../../Assets/Images/MetaModellerImages/solid.svg";
import DashedLine from "../../../../Assets/Images/MetaModellerImages/dashed.svg";
import DottedLine from "../../../../Assets/Images/MetaModellerImages/dotted.svg";


const lineStyleOptions = [
    { id: "solid", label: "Solid", image: SolidLine },
    { id: "dashed", label: "Dashed", image: DashedLine },
    {
        id:"dotted", label:"Dotted", image:DottedLine
    }
];

// Line Style Modal Component
const LineStyleModal = ({ open, onClose, onSelect, handleClose, selectedLineStyle, theme, language }) => {
    // Local state for temporary selection
    const [tempSelectedStyle, setTempSelectedStyle] = useState(selectedLineStyle);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    backgroundColor: theme === "default" ? "#2158a4" : theme === "dark" ? "#393a3a" : "",
                    color: "#cecece",
                    padding: "3px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={GreenEaxee} alt="img" style={{ width: "40px", height: "40px", marginRight: "5px" }} />
                    <Typography variant="h6">
                        {language === "en" ? "Select Line Style" : AdminTranslation["Select Line Style"]}
                    </Typography>
                </Box>
                <IconButton
                    sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#cecece",
                        [language === "ar" ? "left" : "right"]: 0,
                    }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent
                style={{
                    backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
                }}
            >
                <Box sx={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    {lineStyleOptions.map((option) => (
                        <Box
                            key={option.id}
                            onClick={() => setTempSelectedStyle(option.id)} // Update local state
                            sx={{
                                border: tempSelectedStyle === option.id ? "2px solid #2158a4" : "2px solid transparent",
                                cursor: "pointer",
                                padding: "5px",
                                borderRadius: "4px",
                                textAlign: "center",
                                width: "80px",
                            }}
                        >
                            <img
                                src={option.image}
                                alt={option.label}
                                style={{ width: "40px", height: "20px", objectFit: "contain" }}
                            />
                            {/* <Typography variant="body2" sx={{ marginTop: "5px", fontWeight: "bold" }}>
                                {option.label}
                            </Typography> */}
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                        marginTop: "20px",
                    }}
                >
                    <CustomButton
                        title="Add"
                        type="submit"
                        Theme={theme}
                        sx={{ width: "50%" }}
                        disabled={!tempSelectedStyle} // Disable if no line style is selected
                        onClick={() => {
                            onSelect(tempSelectedStyle); // Apply the selected style
                            onClose(); // Close the modal
                        }}
                    />

                    <CustomButton
                        title={language === "en" ? "Cancel" : AdminTranslation["Cancel"]}
                        type="button"
                        Theme={theme}
                        onClick={handleClose} // Close modal without changes
                        sx={{ width: "50%" }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default LineStyleModal;
