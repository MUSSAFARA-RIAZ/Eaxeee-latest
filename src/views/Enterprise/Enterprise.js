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
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { EnterpriseContent } from "./Components/Enterprise_iconsTab";
import DropDownInputField from "./Components/DropDownInputField";
import SpeedIcons from "./Components/Messenger";
// import defaultstyle from "./EnterpriseDefault.module.css";
// import darkstyle from "./EnterpriseDark.module.css";
import Iconbox from "./Components/Iconbox";

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

  const tabs = [
    { icon: <ViewInArOutlinedIcon /> },
    { icon: <DescriptionOutlinedIcon /> },
    { icon: <ShareOutlinedIcon /> },
    { icon: <DescriptionOutlinedIcon /> },
    { icon: <ViewInArOutlinedIcon /> },
    { icon: <ShareOutlinedIcon /> },
    { icon: <DescriptionOutlinedIcon /> },
    { icon: <ShareOutlinedIcon /> },
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
          <LeftPane open={open} onClose={handleDrawerClose} props={props}>
            <div>
              <UserTabs
                value={value}
                handleChange={handleMainChange}
                tabs={tabs}
                language={props.language}
                theme={props.theme}
                onClick={() => props.settree("tree1")}
              />
            </div>

            <div>
              <DropDownInputField props={props} />
            </div>
            <div>
              {view === 0 && (
                <EnterpriseContent value={value} language={props.language} />
              )}
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
                Architecture 1 : Diagram 2
              </div>
              <div style={{ width: "60%" }}></div>
            </div>
              <Iconbox theme={props.theme} />
              <SpeedIcons props={props} />
          </RightPane>
        </>
      ) : (
        <>QuickAccess module</>
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
