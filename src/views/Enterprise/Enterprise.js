import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
// import Enterprise_iconsTab from "./Components/Enterprise_iconsTab";
import { UserTabs } from "./Components/Enterprise_iconsTab";


import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import { InputLabel } from "@mui/material";

import DropDown_InputField from "./Components/DropDown_InputField";
// import { faCubes } from '@fortawesome/free-solid-svg-icons';

const Enterprise = (props) => {
  // const {language}=props;

  const [open, setOpen] = useState(true);
  // const [view, setView] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [value, setValue] = useState(0);

 

  const tabs = [
    { icon: <ViewInArOutlinedIcon/> },
    { icon: <ViewInArOutlinedIcon/> },
    { icon: <DescriptionOutlinedIcon/> },
    // { icon: <LockIcon /> },
    { icon: <ShareOutlinedIcon/> }
  ];
  const handleMainChange = (event, newValue) => {
    setValue(newValue);
    
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <LeftPane open={open} onClose={handleDrawerClose} props={props}>
      <div style={{display:"flex", flexDirection:"column"}}>
      <UserTabs value={value} handleChange={handleMainChange} tabs={tabs} />
      <DropDown_InputField/>
      </div>
      
     
      </LeftPane>
      <RightPane open={open} props={props} handleDrawerOpen={handleDrawerOpen}>
        {/* Content for the RightPane */}
        <div></div>
        <div></div>
      </RightPane>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,
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

export default connect(mapStateToProps, mapDispatchToProps)(Enterprise);
