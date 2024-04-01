import React, { useState } from "react";
import Box from "@mui/material/Box";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Messagesection from "./ImpexComponents/Messagesection";
import { connect } from "react-redux";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ImportExportBox from "./ImpexComponents/Import_exportBox";
const drawerWidth = 310;
const Main = ({ open, children, language }) => {
  const isLanguageRTL = language === "ar";
  return (
    <main
      style={{
        flexGrow: 1,
        backgroundColor: "#cceaed",
        width: open ? "calc(100% - 310px)" : "100%",
        height: open ? "calc(100% - 50px)" : "calc(100vh - 50px)",
        marginLeft: language === "en" ? (open ? drawerWidth : 0) : "auto",
        direction: isLanguageRTL ? "rtl" : "ltr",
      }}
    >
      {children}
    </main>
  );
};

const DrawerHeader = ({ onClose }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "45px",
        justifyContent: "flex-end",
      }}
    >
      <IconButton sx={{ color: "#0d7e8a" }} onClick={onClose}>
        <ArrowCircleLeftRoundedIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
    </div>
  );
};

function DrawerMain(props) {
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

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: "50px",
            border: "none",
            height: "92vh",
            backgroundColor: "#dff7fa",
            color:
              props.theme === "default"
                ? "black"
                : props.theme === "light"
                ? "black"
                : "#b4b4b4",
          },
        }}
        variant="persistent"
        anchor={props.language === "en" ? "left" : "right"}
        open={open}
      >
        <DrawerHeader sx={{ height: "10px" }} onClose={handleDrawerClose} />
        <ImportExportBox />
      </Drawer>

      <Main open={open} language={props.language}>
        <div
          style={{
            display: "flex",
            height: "45px",
            alignItems: "center",
            backgroundColor: "#dff7fa",
          }}
        >
          <div
            style={{
              ...(open && { display: "none" }),
              borderTopRightRadius: "60%",
              borderBottomRightRadius: "60%",
              width: "max-content",
              paddingRight: 10,
            }}
          >
            <IconButton
              color="red"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <ArrowCircleRightRoundedIcon
                sx={{
                  color: "#0d7e8a",
                  fontSize: "2rem",
                  borderTopRightRadius: "50%",
                  borderBottomRightRadius: "50%",
                  position: "relative",
                  left: 10,
                }}
              />
            </IconButton>
          </div>
        </div>
        <div>
          <Messagesection
            adjustHeight={open ? `calc(100vh - 96px)` : "calc(100vh - 103px)"}
          />
        </div>
      </Main>
    </Box>
  );
}
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMain);
