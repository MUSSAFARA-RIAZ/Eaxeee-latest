import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import { QuickAccessTabs, UserTabs, QuickAccessContent } from "./Components/Enterprise_iconsTab";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ReplayIcon from "@mui/icons-material/Replay";
import StaticIconLeftPane from "./Components/StaticIconLeftPane";
import DropDown from "./Components/DropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import UseNumberInput from "./Components/CustomNameInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import AdminTranslation from "../../Utils/AdminTranslation/AdminTranslation";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { TextField } from "@mui/material";

import objectdefault from "../../Assets/Images/objectcharcoal.png";
import objectdark from "../../Assets/Images/objectpale.png";
import processdefault from "../../Assets/Images/processcharcoal.png";
import processdark from "../../Assets/Images/processpale.png";
import blueprintdefault from "../../Assets/Images/blueprintcharcoal.png";
import blueprintdark from "../../Assets/Images/blueprintpale.png";
import ArchitectureButton from "../../components/CustomButton/ArchitectureButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LoopIcon from "@mui/icons-material/Loop";
import SaveIcon from "@mui/icons-material/Save";
import NestedDropDown from "./Components/NestedDropDown";
import { fontSize } from "@mui/system";
// import ToggleOnIcon from "@mui/icons-material/ToggleOn";
// import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 34, // reduced width
    height: 20, // reduced height
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(14px)", // adjust for new size
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
        width: 16, // reduced thumb width
        height: 16, // reduced thumb height
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


const QuickAccess = (props) => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(0);
    // const [isToggled, setIsToggled] = useState(false); // Moved inside component

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const handleMainChange = (event, newValue) => setValue(newValue);
    // const handleToggle = () => setIsToggled((prevState) => !prevState); // Toggle function

    const objectsrc = props.theme === "dark" ? objectdark : objectdefault;
    const processsrc = props.theme === "dark" ? processdark : processdefault;
    const artifactsrc = props.theme === "dark" ? blueprintdark : blueprintdefault;

    const tabs = [
        {
            icon: (
                <Tooltip title="Object">
                    <img src={objectsrc} alt="Object" style={{ width: "24px", height: "24px" }} />
                </Tooltip>
            ),
        },
        {
            icon: (
                <Tooltip title="Artifacts">
                    <img src={artifactsrc} alt="Artifacts" style={{ width: "24px", height: "24px" }} />
                </Tooltip>
            ),
        },
        {
            icon: (
                <Tooltip title="Process">
                    <img src={processsrc} alt="Process" style={{ width: "24px", height: "24px" }} />
                </Tooltip>
            ),
        },
        {
            icon: (
                <Tooltip title="Documents">
                    <DescriptionOutlinedIcon />
                </Tooltip>
            ),
        },
    ];

    const firstdropdownitems = [
        { value: 10, label: "Eaxee" },
        { value: 20, label: "New Architecture" },
        { value: 30, label: "Evolved Architecture" },
    ];

    const [isToggled, setIsToggled] = useState(false); 
    const [isToggledImage, setIsToggledImage]=useState(false);
  
    
    const handleToggleImage=()=>{
      setIsToggledImage(prevState => !prevState); // Toggle state
      
    }
  
  
      

    const handleToggle = () => {
        setIsToggled(prevState => !prevState); // Toggle state
      };
    const seconddropdownitems = [{ value: 40, label: "Select All" }];

    return (
        <>
            <LeftPane open={open} onClose={handleDrawerClose} props={props}>
                <div></div>
                <div>
                    <StaticIconLeftPane />
                </div>
            </LeftPane>

            <RightPane open={open} props={props} handleDrawerOpen={handleDrawerOpen}>
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "40%", display: "flex", alignItems: "center", marginLeft: open ? "25px" : "50px" }}>
                        <QuickAccessTabs
                            value={value}
                            handleChange={handleMainChange}
                            tabs={tabs}
                            language={props.language}
                            theme={props.theme}
                            onClick={() => props.settable("table1")}
                        />
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        {/* <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <CustomButton
                                title="Delete"
                                startIcon={<DeleteIcon sx={{ color: props.theme === "default" ? "#2158a4" : "#a5d149" }} />}
                                Theme={props.theme}
                            />
                            <CustomButton
                                title="Remove"
                                startIcon={<CancelIcon sx={{ color: props.theme === "default" ? "#2158a4" : "#a5d149" }} />}
                                Theme={props.theme}
                            />
                            <CustomButton
                                title="Undo"
                                startIcon={<ReplayIcon sx={{ color: props.theme === "default" ? "#2158a4" : "#a5d149" }} />}
                                Theme={props.theme}
                            />
                            <CustomButton
                                title="Show All Objects"
                                startIcon={isToggled ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                // startIcon={<ReplayIcon sx={{ color: props.theme === "default" ? "#2158a4" : "#a5d149" }} />}
                                Theme={props.theme}
                                onClick={handleToggle}
                            />
                        </Box>
                        <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                style: { height: 36, position: "relative", top: "5px" },
                            }}
                        /> */}
                    </div>
                </div>

                <div style={{ padding: "30px", height: "50px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <NestedDropDown/>
                    {/* <DropDown menuItems={seconddropdownitems} /> */}
                    <p>Object Last Updated</p>
                    <UseNumberInput theme={props.theme} open={open}  />
                    <p style={{ marginLeft: "5px" }}>Days</p>

                    {/* <CustomButton
                        title={props.language === "en" ? "Show" : AdminTranslation["Show"]}
                        type="submit"
                        Theme={props.theme}
                    /> */}

                 
                        <div style={{ width: "50%",  display: "flex", flexDirection: "row", gap: "10px", justifyContent: "flex-end", }}>
                        {/* <ArchitectureButton
                                title="Show All Objects"
                                startIcon={isToggled ? <ToggleOnIcon /> : <ToggleOffIcon />} // Toggle icon based on state
                                Theme={props.theme}

                                // tooltipTitle="Toggle Relations" // Tooltip for toggle button
                                onClick={handleToggle} // Toggle functionality
                            /> */}
                            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>

                            {/* <IOSSwitch defaultChecked inputProps={{ 'aria-label': 'iOS style switch' }} /> */}
                            </Box>
                            <ArchitectureButton
                                title="Show All Objects"
                                startIcon={ <IOSSwitch defaultChecked inputProps={{ 'aria-label': 'iOS style switch', fontSize:"20px" }} />}
                                Theme={props.theme}
                                // onClick={handleToggleImage}
                            />
                            <ArchitectureButton
                                title="Remove"
                                startIcon={<CancelIcon/>}
                                Theme={props.theme}
                                // onClick={handleToggleImage}
                            />
                           
                          
                            <ArchitectureButton
                                title="Restore"
                                startIcon={<ReplayIcon />}
                                Theme={props.theme}
                                onClick={() => console.log('Loop clicked')}

                            />
                            <ArchitectureButton
                                title="Delete"
                                startIcon={<DeleteIcon />}
                                Theme={props.theme}
                                onClick={() => console.log('Filter clicked')}
                            />
                             <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                             <TextField id="outlined-basic" label="Search"  size="small"  InputProps={{
                                style: { height: 36, },

                            }} />
                            </Box>
                            
                            </div>

                           
                    

                       
                    </div>

                    <QuickAccessContent value={value} language={props.language} />
            </RightPane>
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.language,
    theme: state.theme,
    subPage: state.subPage,
});

const mapDispatchToProps = (dispatch) => ({
    setLanguage: (lang) =>
        dispatch({
            type: "TOGGLELANG",
            value: lang === "en" ? "ar" : "en",
        }),
    setTheme: (theme) =>
        dispatch({
            type: "UPDATETHEME",
            value: theme,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickAccess);
