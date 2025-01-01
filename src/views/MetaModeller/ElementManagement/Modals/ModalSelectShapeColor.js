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
import { GetSvgIconImage } from "../../../../Utils/SvgIconsMap/SvgIconMapper";
import { ChromePicker } from "react-color";

const ModalSelectShapeColor = ({
  open,
  onClose,
  onSelect,
  handleClose,
  selectedLineStyle,
  theme,
  language,
}) => {
  // Local state for temporary selection
  const SelectedIcon = GetSvgIconImage(selectedLineStyle)
  // Define the state for selected color
  const [selectedColor, setSelectedColor] = useState(theme === "default" ? "" : "#cecece");
  const [showColorPicker, setShowColorPicker] = useState(false); // Toggle for color picker

  // Standard color options, similar to PowerPoint fill options
  const standardColors = [
    "#000000", // Black
    "#FF0000", // Bright Red
    "#008000", // Bright Dark Green
    "#0000FF", // Bright Blue
    "#FFD700", // Bright Gold
    "#8A2BE2", // Bright Blue-Violet
    "#6495ED", // Bright Cornflower Blue
    "#FFA500", // Bright Orange
    "#800080", // Bright Purple
    "#FFC0CB", // Bright Pink
    "#FFFFFF", // White (10th color in the first line)
    "#FF4500", // Bright Orange-Red
    "#00FF00", // Bright Green
    "#00BFFF", // Bright Deep Sky Blue
    "#FFFF00", // Bright Yellow
    "#FF00FF", // Bright Magenta
    "#00FFFF", // Bright Cyan
    "#7FFF00", // Bright Chartreuse Green
    "#FF1493", // Bright Deep Pink
    "#2E8B57", // Bright Sea Green
  ];

  // Handle color change when selecting a standard color or using the color picker
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor:
            theme === "default" ? "#2158a4" : theme === "dark" ? "#393a3a" : "",
          color: "#cecece",
          padding: "3px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={GreenEaxee}
            alt="img"
            style={{ width: "40px", height: "40px", marginRight: "5px" }}
          />
          <Typography variant="h6">
            {language === "en"
              ? "Select Element Icon Color"
              : AdminTranslation["Select Element Icon"]}
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
            theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: "40px",
            marginTop: "20px",
          }}
        >
          <SelectedIcon
            style={{
              width: "130px",
              height: "130px",
              objectFit: "contain",
              color: selectedColor,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "20px",
              width: "80%",
            }}
          >
            {/* Standard color options */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                overflowY: "visible",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              {standardColors.map((color) => (
                <Box
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: color,
                    cursor: "pointer",
                    // border: "1px solid transparent", // Avoid direct border styling; use boxShadow instead
                    boxShadow: `
      inset 0 0 0 1px white, // Inner fixed white border
      0 0 0 1px ${theme === "dark" ? "#cecece" : "#747475"}`, // Outer border for light/dark mode
                    ":hover": {
                      boxShadow: `
        inset 0 0 0 1px white, // Inner fixed white border (does not change on hover)
        0 0 0 2px ${theme === "dark" ? "#a5d149" : "#2158a4"}`, // Outer border changes on hover
                    },
                  }}
                />
              ))}
            </Box>

            {/* Custom Color Button */}
            <Box
              onClick={() => setShowColorPicker(!showColorPicker)}
              sx={{
                width: "fit-content",
                border: "none",
                fontSize: "14px",
                cursor: "pointer",
                color: theme === "dark" ? "#cecece" : "",
                backgroundColor: "transparent",
                textTransform: "uppercase",
                ":hover": {
                  color: theme === "dark" ? "#a5d149" : "#2158a4",
                },
              }}
            >
              Custom Color
            </Box>

            {/* Show color picker if enabled */}
            {showColorPicker && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChromePicker
                  color={selectedColor}
                  onChange={handleColorChange}
                />
              </div>
            )}
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
            title="OK"
            type="submit"
            Theme={theme}
            sx={{ width: "50%" }}
            disabled={!selectedColor} // Disable if no line style is selected
            onClick={() => {
              onSelect(selectedColor); // Apply the selected style
              setSelectedColor("");
              onClose(); // Close the modal
            }}
          />

          <CustomButton
            title={language === "en" ? "Cancel" : AdminTranslation["Cancel"]}
            type="button"
            Theme={theme}
            onClick={() => {onClose(); setSelectedColor("");}} // Close modal without changes
            sx={{ width: "50%" }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSelectShapeColor;
