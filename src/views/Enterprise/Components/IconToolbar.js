// IconToolbar.js
import React, { useState } from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ImageIcon from "@mui/icons-material/Image";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LoopIcon from "@mui/icons-material/Loop";
import SaveIcon from "@mui/icons-material/Save";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SaveAsIcon from '@mui/icons-material/SaveAs'; // Import ToggleOff icon

import darktheme from "../../../Themes/dark_theme.module.css";
import lighttheme from "../../../Themes/light_theme.module.css";
import defaulttheme from "../../../Themes/default_theme.module.css";
import CustomButton from '../../../components/CustomButton/CustomButton';
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ArchitectureButton from '../../../components/CustomButton/ArchitectureButton';
import { Box } from "@mui/material";
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 34, // reduced width
  height: 18, // reduced height
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)", // adjust for new size
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#a5d149" : "#2158a4",
        opacity: 1,
        border: 0,
      },
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 14, // reduced thumb width
    height: 14, // reduced thumb height
  },
  "& .MuiSwitch-track": {
    borderRadius: 10, // adjusted for new size
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const IconToolbar = ({ theme, handleHideBackground }) => {



  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "row", gap: "10px", justifyContent: "flex-end", }}>
      <ArchitectureButton
        title="Container"
        startIcon={<IOSSwitch defaultChecked inputProps={{ 'aria-label': 'iOS style switch', fontSize: "20px" }} />}
        // startIcon={isToggledImage ? <ToggleOnIcon /> : <ToggleOffIcon />} 
        Theme={theme}

      />
      <ArchitectureButton
        title="Relations"
        startIcon={<IOSSwitch defaultChecked inputProps={{ 'aria-label': 'iOS style switch', fontSize: "20px" }} />}
        //  Toggle icon based on state
        Theme={theme}

      // tooltipTitle="Toggle Relations" // Tooltip for toggle button

      />
      <ArchitectureButton
        title="Synchronize"
        startIcon={<LoopIcon />}
        Theme={theme}
        onClick={() => console.log('Loop clicked')}

      />
      <ArchitectureButton
        title="Diagram Filter"
        startIcon={<FilterAltIcon />}
        Theme={theme}
        onClick={() => console.log('Filter clicked')}
      />


      <ArchitectureButton
        startIcon={<ZoomOutMapIcon />}
        Theme={theme}
        // tooltipTitle="Fit to Screen"
        title="FitScreen"
        onClick={() => console.log('Zoom Out Map clicked')}
      />
      <ArchitectureButton
        startIcon={<ZoomInIcon />}
        Theme={theme}
        // tooltipTitle="Zoom In"
        title="Zoom In"
        onClick={() => console.log('Zoom In clicked')}
      />
      <ArchitectureButton
        startIcon={<ZoomOutIcon />}
        Theme={theme}
        // tooltipTitle="Zoom Out"
        title="Zoom Out"
        onClick={() => console.log('Zoom Out clicked')}
      />
      <ArchitectureButton
        startIcon={<SaveIcon />}
        Theme={theme}
        title="Save"
        // tooltipTitle="Save"
        onClick={() => console.log('Save clicked')}
      />
      <ArchitectureButton
        startIcon={<SaveAsIcon />}
        title="Save As Graph"
        Theme={theme}
        // tooltipTitle="Save As Graph"
        onClick={() => console.log('Save As Graph clicked')}
      />


    </div>
  );
};

export default IconToolbar;
