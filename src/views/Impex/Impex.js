import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../../components/MainStructure/Leftpane";
import RightPane from "../../components/MainStructure/Rightpane";

const drawerWidth = 310;

const Main = ({ open, children, language, handleDrawerOpen , props}) => {
  const isLanguageRTL = language === "ar";
  const mainWidth = open ? `calc(100% - ${drawerWidth}px)` : "100%"; // Calculate main width

  return (
    <main
      style={{
        flexGrow: 1,

        width: mainWidth,
        backgroundColor:props.theme === "default"
        ? "#cceaed "
        : props.theme === "light"
        ? "#eff3f7"
        : "#212121",
        // border:"2px solid red",
        height: open ? "calc(100% - 50px)" : "calc(100vh - 50px)",
        marginLeft: isLanguageRTL ? "auto" : open ? `${drawerWidth}px` : 0,
        marginRight: isLanguageRTL ? (open ? `${drawerWidth}px` : 0) : "auto",
        direction: isLanguageRTL ? "rtl" : "ltr",
        overflowX: open ? "hidden" : "auto", // Hide overflow when drawer is open
        transition: !open ? "all .5s ease-out" : "all .5s ease-in",
      }}
    >
      {children}
    </main>
  );
};

const Impex = (props) => {
  console.log("Impexxxx", props);
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
        props={props}
      >
        <RightPane
          open={open}
          props={props}
          handleDrawerOpen={handleDrawerOpen}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Impex);
