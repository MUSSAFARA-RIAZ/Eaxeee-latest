import React, { useEffect, useState } from "react";
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
// import SolidLine from "../../../../Assets/Images/solidLin.jpg";
// import DashedLine from "../../../../Assets/Images/dotted.png";
// import Diamond from "../../../../Assets/Images/MetaModellerImages/diamond.svg";
// import none from "../../../../Assets/Images/MetaModellerImages/none.svg";
// import oval from "../../../../Assets/Images/MetaModellerImages/oval.svg";
// import UnfilledDiamond from "../../../../Assets/Images/MetaModellerImages/unfilled-diamond.svg";
// import Blockfilled from "../../../../Assets/Images/MetaModellerImages/block.svg";
import Tick from "../../../../Assets/Images/MetaModellerImages/tick.svg";
// import Medical from "../../../../Assets/Images/MetaModellerImages/medical.svg";
// import Music from "../../../../Assets/Images/MetaModellerImages/music.svg";
// import Vehicle from "../../../../Assets/Images/MetaModellerImages/vehicle.svg";
import music1 from "../../../../Assets/Images/MetaModellerImages/music-icons/music-library-svgrepo-com.svg";
import music2 from "../../../../Assets/Images/MetaModellerImages/music-icons/music-note-3-svgrepo-com.svg";
import music3 from "../../../../Assets/Images/MetaModellerImages/music-icons/music-note-4-svgrepo-com.svg";
// import music4 from "../../../../Assets/Images/MetaModellerImages/music-icons/music-note-slash-svgrepo-com.svg";
// import vehicle1 from "../../../../Assets/Images/MetaModellerImages/vehicle-icons/arrow-ramp-right-svgrepo-com.svg";
import vehicle2 from "../../../../Assets/Images/MetaModellerImages/vehicle-icons/vehicle-bicycle-svgrepo-com.svg";
import vehicle3 from "../../../../Assets/Images/MetaModellerImages/vehicle-icons/vehicle-car-svgrepo-com.svg";
// import vehicle4 from "../../../../Assets/Images/MetaModellerImages/vehicle-icons/vehicle-ship-svgrepo-com.svg";
import medical1 from "../../../../Assets/Images/MetaModellerImages/medical-icons/medical-bottle-svgrepo-com.svg";
import medical2 from "../../../../Assets/Images/MetaModellerImages/medical-icons/medical-circle-svgrepo-com.svg";
import medical3 from "../../../../Assets/Images/MetaModellerImages/medical-icons/medical-kit-svgrepo-com.svg";

import filterOptions from "../../../../constants/Filters/filterOptions"

// const filterOptions = [
//     {
//         id: "Music", label: "Music", image: Music, text: "Music", relatedIcons: [
//             { id: music1 },
//             { id: music2 },
//             { id: music3 },
//             { id: music4 },
//         ]
//     },
//     {
//         id: "Vehicle", label: "Vehicle", image: Vehicle, text: "Vehicle", relatedIcons: [
//             { id: vehicle1 },
//             { id: vehicle2 },
//             { id: vehicle3 },
//             { id: vehicle4 },
//         ]
//     },
//     {
//         id: "Medical", label: "Medical", image: Medical, text: "Medical", relatedIcons: [
//             { id: medical1 },
//             { id: medical2 },
//             { id: medical3 },
//         ]
//     },
// ]


// Line Style Modal Component
const ElementShapeModal = ({ open, onClose, onSelect, handleClose, selectedLineStyle, theme, language }) => {
    // Local state for temporary selection
    const [tempSelectedStyle, setTempSelectedStyle] = useState(selectedLineStyle);

    const [filteredIcons, setFilteredIcons] = useState([
        { id: medical1 },
        { id: medical2 },
        { id: medical3 },
        { id: vehicle2 },
        { id: vehicle3 },
        { id: music1 },
        { id: music2 },
        { id: music3 },
    ]);

    const handleFilter = (id) => {
        const filteredIconsResult = filterOptions.find((ele) => ele.id === id);
        const relatedIcons = filteredIconsResult ? filteredIconsResult.relatedIcons : [];
        setFilteredIcons(relatedIcons);
    };

    // this useffect is just for checking purpose.
    useEffect(() => {
        console.log("Updated filteredIcons:", filteredIcons);
    }, [filteredIcons]);


    return (

        <Dialog open={open} onClose={onClose} maxWidth="xlg" fullWidth>
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

            <DialogContent // this is the div that contains all icons and filters
                style={{
                    backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
                    // border: "2px solid yellow"

                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                    <Box sx={{
                        // border: "2px solid red", 
                        width: "20%", display: "grid", gridTemplateColumns: "auto"
                    }} className="pt-2">
                        {filterOptions.map((option) => {
                            return (
                                <Box
                                    key={option.id}
                                    sx={{
                                        cursor: "pointer",
                                        border: "1px solid black",
                                        padding: "5px",
                                        borderRadius: "4px",
                                        textAlign: "center",
                                        width: "100%",
                                        marginBottom: "20px",
                                        overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center"
                                    }}

                                >

                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}
                                        onClick={() => {

                                            handleFilter(option.id)


                                        }} >
                                        <Typography variant="h6" >
                                            {option.text}
                                        </Typography >
                                        <img
                                            src={option.image}
                                            alt={option.label}
                                            style={{ width: "25px", objectFit: "contain" }}
                                        />
                                    </Box>

                                </Box>
                            )
                        })}
                    </Box>
                    <Box sx={{
                        display: "flex", gap: "16px", justifyContent: "start", flexWrap: "wrap",
                        // border: "2px solid red" 
                    }}>
                        {filteredIcons.map((option) => (
                            <Box
                                key={option.id}
                                onClick={() => setTempSelectedStyle(option.id)} // Update local state
                                sx={{
                                    // border: tempSelectedStyle === option.id ? "2px solid #2158a4" : "2px solid transparent",
                                    cursor: "pointer",
                                    padding: "5px",
                                    borderRadius: "4px",
                                    textAlign: "center",
                                    width: "110px",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={option.id}
                                    // alt={option.label}
                                    style={{ width: "70px", height: "50px", objectFit: "contain" }}
                                />
                                {tempSelectedStyle === option.id && <img src={Tick}
                                    alt={option.label}
                                    style={{ width: "20px", height: "20px", objectFit: "contain", position: "absolute" }}>
                                </img>}
                                {/* <Typography variant="body2" sx={{ marginTop: "5px", fontWeight: "bold" }}>
                                {option.label}
                            </Typography> */}
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
                        onClick={onClose} // Close modal without changes
                        sx={{ width: "50%" }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ElementShapeModal;
