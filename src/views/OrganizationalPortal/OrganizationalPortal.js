import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../../components/MainStructure/Leftpane";
import RightPane from "../../components/MainStructure/Rightpane";

// Define drawerWidth
const drawerWidth = 240;

const Main = (props) => {
  const { open, children, language } = props;
  const isLanguageRTL = language === "ar";
  const mainWidth = open ? `calc(100% - ${drawerWidth}px)` : "100%"; // Calculate main width

  return (
    <main
      style={{
        flexGrow: 1,
        width: mainWidth,
        height: open ? "calc(100% - 50px)" : "calc(100vh - 50px)",
        marginLeft: isLanguageRTL ? "auto" : open ? `${drawerWidth}px` : 0,
        marginRight: isLanguageRTL ? (open ? `${drawerWidth}px` : 0) : "auto",
        direction: isLanguageRTL ? "rtl" : "ltr",
        overflowX: open ? "hidden" : "auto", // Hide overflow when drawer is open
      }}
    >
      {children}
    </main>
  );
};

const OrganizationalPortal = (props) => {
  console.log("OrganizationalPortalxxx", props)
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />

      <LeftPane open={open} onClose={handleDrawerClose} props={props} />

      <Main
        open={open}
        language={props.language}
        handleDrawerOpen={handleDrawerOpen}
      >
        <RightPane open={open} props={props} handleDrawerOpen={handleDrawerOpen} />
      </Main>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (lang) => {
      return dispatch({
        type: "TOGGLELANG",
        value: lang === "en" ? "ar" : "en",
      });
    },
    setTheme: (theme) => {
      return dispatch({
        type: "UPDATETHEME",
        value: theme,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationalPortal);
