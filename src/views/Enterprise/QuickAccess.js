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
    console.log('props in quick access', props);



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
    const [isToggledImage, setIsToggledImage] = useState(false);


    const handleToggleImage = () => {
        setIsToggledImage(prevState => !prevState); // Toggle state

    }




    const handleToggle = () => {
        setIsToggled(prevState => !prevState); // Toggle state
    };
    const seconddropdownitems = [{ value: 40, label: "Select All" }];

    return (
        <>


            <div style={{ padding: "30px", height: "50px", display: props.activeTab ? "none" : "flex", alignItems: "center", gap: "10px" }}>

                <div style={{ display: (props.activeTable === "Table3" || props.activeTable === "Table4") ? "none" : "block" }}>
                    <NestedDropDown architecturename={props.architecturename} />
                </div>


                {/* <DropDown menuItems={seconddropdownitems} /> */}
                <p>Object Last Updated</p>
                <UseNumberInput theme={props.theme} open={open} />
                <p style={{ marginLeft: "5px" }}>Days</p>




                <div style={{ width: "50%", display: "flex", flexDirection: "row", gap: "10px", justifyContent: "flex-end", }}>

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>


                    </Box>
                    <ArchitectureButton
                        title="Show All Objects"
                        startIcon={<IOSSwitch defaultChecked inputProps={{ 'aria-label': 'iOS style switch', fontSize: "20px" }} />}
                        Theme={props.theme}

                    />
                    <ArchitectureButton
                        title="Remove"
                        startIcon={<CancelIcon />}
                        Theme={props.theme}

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
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <TextField id="outlined-basic" label="Search" size="small" InputProps={{
                            style: { height: 36, },

                        }} />
                    </Box>

                </div>





            </div>
            <div style={{ display: props.activeTab ? "none" : "block" }}>
                <QuickAccessContent value={value} language={props.language} />
            </div>

        </>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.language,
        theme: state.theme,
        route: state.route,
        activepage: state.activepage,
        subpage: state.subpage,
        activeTree: state.activeTree,
        activeTable: state.activeTable,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (lang) => dispatch({ type: "TOGGLELANG", value: lang === "en" ? "ar" : "en" }),
        setTheme: (theme) => dispatch({ type: "UPDATETHEME", value: theme }),
        setRoute: (route) => dispatch({ type: "UPDATEROUTE", value: route }),
        setActivePage: (pageName) => dispatch({ type: "SETACTIVEPAGE", value: pageName }),
        setSubPage: (subpage) => dispatch({ type: "SETSUBPAGE", value: subpage }),
        setActiveTree: (activeTree) => dispatch({ type: "ACTIVETREE", value: activeTree }),
        setActiveTable: (activeTable) => dispatch({ type: "ACTIVETABLE", value: activeTable }),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickAccess);
