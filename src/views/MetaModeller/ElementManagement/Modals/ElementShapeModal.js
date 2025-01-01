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
import { GetIconsByCategory, GetAllCategoryNames } from "../../../../Utils/SvgIconsMap/SvgIconMapper";
import { ReactComponent as Tick } from "../../../../Assets/Images/MetaModellerImages/tick.svg";

// Line Style Modal Component
const ElementShapeModal = ({ open, onClose, onSelect, handleClose, selectedLineStyle, theme, language }) => {
    // State to manage selected category and temporary style selection
    const [tempSelectedStyle, setTempSelectedStyle] = useState(selectedLineStyle);
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Get all categories and icons based on selected category
    const categories = GetAllCategoryNames();
    const icons = GetIconsByCategory(selectedCategory);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
                        {language === "en" ? "Select Element Icon" : AdminTranslation["Select Element Icon"]}
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
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent
                style={{
                backgroundColor:
                    theme === "default"
                    ? "#cecece"
                    : theme === "dark"
                    ? "#212121"
                    : "",
                }}
            >
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxHeight: "300px",
                }}
                >
                {/* Sidebar for categories */}
                <Box
                    sx={{
                    width: "25%",
                    display: "grid",
                    gridTemplateColumns: "auto",
                    position: "relative",
                    left: -24,
                    overflowY: "auto",
                    backgroundColor: theme === "dark" ? "" : "#cecece",
                    borderRight:
                        theme === "dark" ? "1px solid #cecece" : "1px solid #747475",
                    }}
                >
                    {["All", ...categories].map((category) => (
                    <Box
                        key={category}
                        sx={{
                        padding: "10px",
                        cursor: "pointer",
                        color:
                            selectedCategory === category.toLowerCase()
                            ? theme === "default"
                                ? "#2158a4"
                                : "#a5d149"
                            : theme === "default"
                            ? ""
                            : "#cecece",
                        ":hover": {
                            backgroundColor:
                            theme === "dark"
                                ? "rgba(165,209, 73, 0.5)"
                                : "rgba(33,88, 164, 0.2)",
                        },
                        }}
                        onClick={() => setSelectedCategory(category.toLowerCase())}
                    >
                        <Typography variant="body2" align="center">
                        {category}
                        </Typography>
                    </Box>
                    ))}
                </Box>
    
                {/* Icon panel */}
                <Box
                    sx={{
                    flex: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    overflowY: "auto",
                    gap: "16px",
                    padding: "10px",
                    justifyContent: "start",
                    }}
                >
                    {icons.map((icon) => (
                    <Box
                        key={icon.id}
                        onClick={
                        () =>
                            setTempSelectedStyle((prev) =>
                            prev === icon.id ? "" : icon.id
                            ) // Toggle selection
                        }
                        sx={{
                        cursor: "pointer",
                        padding: "15px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "fit-content",
                        position: "relative", // Enable absolute positioning for children
                        ":hover": {
                            backgroundColor:
                            theme === "dark"
                                ? "rgba(173, 199, 117, 0.5)"
                                : "rgba(103, 137, 184, 0.2)",
                        },
                        "&:hover::before": {
                            content: tempSelectedStyle === icon.id ? '""' : '""', // Prevent hover effect if selected
                            position: "absolute",
                            top: "3px",
                            right: "-5px",
                            transform: "translateX(-50%)",
                            width: "18px",
                            height: "18px",
                            border:
                            tempSelectedStyle !== icon.id
                                ? `2px solid ${
                                    theme === "default" ? "#747475" : "#cecece"
                                }`
                                : "", // Outline color
                            borderRadius: "50%", // Make it circular
                            backgroundColor: "transparent", // Transparent background
                        },
                        }}
                    >
                        <icon.image
                        style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                            color: theme === "default" ? "" : "#cecece",
                        }}
                        />
                        {tempSelectedStyle === icon.id && (
                        <Tick
                            style={{
                            fill: theme === "default" ? "#2158a4" : "#a5d149",
                            width: "21px",
                            height: "21px",
                            objectFit: "contain",
                            position: "absolute",
                            top: "2px",
                            right: "3px",
                            }}
                        />
                        )}
                    </Box>
                    ))}
                </Box>
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
                        disabled={!tempSelectedStyle} // Disable if no icon is selected
                        onClick={() => {
                            onSelect(tempSelectedStyle); // Apply the selected style
                            onClose(); // Close the modal
                            setTempSelectedStyle("")
                        }}
                    />

                    <CustomButton
                        title={language === "en" ? "Cancel" : AdminTranslation["Cancel"]}
                        type="button"
                        Theme={theme}
                        onClick={() => {onClose(); setTempSelectedStyle("");}} // Close modal without changes
                        sx={{ width: "50%" }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ElementShapeModal;
