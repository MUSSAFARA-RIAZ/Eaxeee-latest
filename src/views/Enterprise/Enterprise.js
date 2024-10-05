import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import { UserTabs } from "./Components/Enterprise_iconsTab";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { EnterpriseContent } from "./Components/Enterprise_iconsTab";
import DropDownInputField from "./Components/DropDownInputField";
import SpeedIcons from "./Components/Messenger";
// import defaultstyle from "./EnterpriseDefault.module.css";
// import darkstyle from "./EnterpriseDark.module.css";
import Tooltip from '@mui/material/Tooltip';
import Iconbox from "./Components/Iconbox";
import objectdefault from "../../Assets/Images/objectcharcoal.png";
import objectdark from "../../Assets/Images/objectpale.png";
import processdefault from "../../Assets/Images/processcharcoal.png";
import processdark from "../../Assets/Images/processpale.png";
import blueprintdefault from "../../Assets/Images/blueprintcharcoal.png";
import blueprintdark from "../../Assets/Images/blueprintpale.png";
import { display } from "@mui/system";
import Architecture from "./Architecture";
import QuickAccess from "./QuickAccess";

const Enterprise = (props) => {
  console.log("props in enterprise", props);

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  
  const [value, setValue] = useState(0);

  const view = 0;
  const objectsrc = props.theme === "dark" ? objectdark : objectdefault;
  const processsrc = props.theme === "dark" ? processdark : processdefault;
  const artifactsrc = props.theme === "dark" ? blueprintdark : blueprintdefault;

  const tabs = [
    { icon: (
      <Tooltip title="Object">
        <img src={objectsrc} alt="Object Default" style={{ width: '24px', height: '24px' }} />
      </Tooltip>
    ) },
    { icon:(<Tooltip title="Artifacts"><img src={artifactsrc} alt="Object Default" style={{ width: '24px', height: '24px' }} /></Tooltip>)},
    { icon: (<Tooltip title="Process"><img src={processsrc} alt="Object Default" style={{ width: '24px', height: '24px' }} /></Tooltip>) },
    { icon: (<Tooltip title="Documents"><DescriptionOutlinedIcon /></Tooltip>) },
  ];
  const handleMainChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {}, [props.subpage]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />

      {props.subPage === "architecture" ? (
        <>
          <Architecture props={props}/>
        </>
      ) : (
        <QuickAccess props={props}/>
      )}
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(Enterprise);
