
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import { QuickAccessTabs, UserTabs } from "./Components/Enterprise_iconsTab";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { QuickAccessContent } from "./Components/Enterprise_iconsTab";
import CancelIcon from '@mui/icons-material/Cancel';

// import defaultstyle from "./EnterpriseDefault.module.css";
// import darkstyle from "./EnterpriseDark.module.css";
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import objectdefault from "../../Assets/Images/objectcharcoal.png";
import objectdark from "../../Assets/Images/objectpale.png";
import processdefault from "../../Assets/Images/processcharcoal.png";
import processdark from "../../Assets/Images/processpale.png";
import blueprintdefault from "../../Assets/Images/blueprintcharcoal.png";
import blueprintdark from "../../Assets/Images/blueprintpale.png";
import ReplayIcon from '@mui/icons-material/Replay';

import StaticIconLeftPane from "./Components/StaticIconLeftPane";
import DropDown from "./Components/DropDown";
import DeleteIcon from '@mui/icons-material/Delete';
import UseNumberInput from "./Components/CustomNameInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import AdminTranslation from "../../Utils/AdminTranslation/AdminTranslation";
import { TextField } from "@mui/material";

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                ...theme.applyStyles('default', {
                    backgroundColor: '#2158a4',
                }),
                //   backgroundColor:'red',
                opacity: 1,
                border: 0,
                ...theme.applyStyles('dark', {
                    backgroundColor: '#a5d149',
                }),
            },

        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            ...theme.applyStyles('default', {
                color: '#2158a4',
            }),

        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('default', {
                color: '#2158a4',
            }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
                opacity: 0.3,
            }),
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
        }),
    },
}));
const QuickAccess = (props) => {
    console.log("props in quickaccess", props);

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [value, setValue] = useState(0);


    const view = 1;
    const objectsrc = props.theme === "dark" ? objectdark : objectdefault;
    const processsrc = props.theme === "dark" ? processdark : processdefault;
    const artifactsrc = props.theme === "dark" ? blueprintdark : blueprintdefault;

    const tabs = [
        {
            icon: (
                <Tooltip title="Object">
                    <img src={objectsrc} alt="Object Default" style={{ width: '24px', height: '24px' }} />
                </Tooltip>
            )
        },
        { icon: (<Tooltip title="Artifacts"><img src={artifactsrc} alt="Object Default" style={{ width: '24px', height: '24px' }} /></Tooltip>) },
        { icon: (<Tooltip title="Process"><img src={processsrc} alt="Object Default" style={{ width: '24px', height: '24px' }} /></Tooltip>) },
        { icon: (<Tooltip title="Documents"><DescriptionOutlinedIcon /></Tooltip>) },
    ];
    const firstdropdownitems = [
        { value: 10, label: 'Eaxee' },
        { value: 20, label: 'New Architecture' },
        { value: 30, label: 'Evolved Architecture' },
    ];

    const seconddropdownitems = [
        { value: 40, label: 'Select All' },
    ]
    const handleMainChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log("open in quickaccess", open);


    return (
        <>
            <LeftPane open={open} onClose={handleDrawerClose} props={props}>

                {/* <div style={{ display: "flex", justifyContent: "center" }}>
                    <UserTabs
                        value={value}
                        handleChange={handleMainChange}
                        tabs={tabs}
                        language={props.language}
                        theme={props.theme}
                        onClick={() => props.settable("table1")}
                    />
                </div> */}

                <div>
                    {/* <DropDownInputField props={props} /> */}
                </div>
                <div>
                    <StaticIconLeftPane />
                    {/* <QuickAccessContent value={value} language={props.language} /> */}

                </div>
            </LeftPane>
            <RightPane
                open={open}
                props={props}
                handleDrawerOpen={handleDrawerOpen}
            >
                <div style={{ display: "flex", width: "100%" }}>
                    <div
                        style={{
                            width: "40%",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: open ? "25px" : "50px",
                        }}
                    >
                        <QuickAccessTabs
                            value={value}
                            handleChange={handleMainChange}
                            tabs={tabs}
                            language={props.language}
                            theme={props.theme}
                            onClick={() => props.settable("table1")}
                        />
                    </div>
                    <div style={{ width: "60%" }}>


                    </div>
                </div>
                {/* ************ */}
                <div style={{ padding: "30px", height: "50px", display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Use gap to control spacing between the items */}

                    <DropDown menuItems={firstdropdownitems} marginleft={open ? "0.2%" : "2%"} />
                    <DropDown menuItems={seconddropdownitems} />

                    {/* Wrap the text and number input in a div with flex to keep them in one line */}

                    <p >Object Updated More than</p>
                    <UseNumberInput theme={props.theme} open={open} />
                    <p style={{ marginLeft: "5px" }}>Days</p>


                    <CustomButton
                        title={props.language === 'en' ? 'Show' : AdminTranslation["Show"]}
                        type="submit"
                        Theme={props.theme}
                    />

                    <div style={{ display: "flex", alignItems: "center", marginleft: open ? 0 : 20, }}>
                        <IOSSwitch defaultChecked inputProps={{ 'aria-label': 'iOS style switch' }} />

                        <CancelIcon sx={{ color: props.theme === 'default' ? '#2158a4' : '#a5d149', fontSize: 40 }} />

                        <ReplayIcon sx={{ color: props.theme === 'default' ? '#2158a4' : '#a5d149', fontSize: 40 }} />
                        <DeleteIcon sx={{ color: props.theme === 'default' ? '#2158a4' : '#a5d149', fontSize: 40 }} />

                    </div>

                    <TextField id="outlined-basic" label="Search" variant="outlined" size="small" />
                </div>


                <div>

                </div>
                <QuickAccessContent value={value} language={props.language} />

                {/* <Iconbox theme={props.theme} /> */}
                {/* <SpeedIcons props={props} /> */}
            </RightPane>
        </>
    )
}

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