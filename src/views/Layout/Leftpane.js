import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { connect } from "react-redux";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import styles from "../Layout/Leftpane.module.css";
import lightthemestyles from "../../Themes/light_theme.module.css";
import darkthemestyles from "../../Themes/dark_theme.module.css";
import defaultthemestyles from "../../Themes/default_theme.module.css";
import Sidebar from "../../components/Header/Components/SideBar/Sidebar";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const drawerWidth = 380;

const LeftPane = ({ props, open, onClose, children }) => {
  const navigate = useNavigate(); // Use useNavigate
  const [drawer, setDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer({ ...drawer, [anchor]: open });
  };

  const changePageTitle = (screenName) => {
    navigate(`/${screenName}`); // Navigate to the new path
  };

  const handleMouseEnter = () => {
    setSidebarVisible(true);
    setDrawer({ ...drawer, left: true });
  };

  const handleMouseLeave = () => {
    setSidebarVisible(false);
    setDrawer({ ...drawer, left: false });
  };

  return (
    <Drawer
      transitionDuration={{ enter: 500, exit: 500 }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          zIndex: 0,
          marginTop: "50px",
          border: "none",
          zIndex: "10",
          backgroundColor:
            props.theme === "default"
              ? "#cecece"
              : props.theme === "light"
                ? "#eff3f7"
                : "#181818",
        },
      }}
      variant="persistent"
      anchor={props.language === "ar" ? "right" : "left"}
      open={open}
    >
      <div
        className={`${styles.Leftpane_firstcontainer}  ${props.theme === "default"
          ? defaultthemestyles.default_drawer_arrowcolor
          : props.theme === "light"
            ? lightthemestyles.light_iconcolor
            : darkthemestyles.dark_drawer_arrowcolor
          }`}
      >
        <div style={{ width: "90%" }}>{children[0]}</div>
        <div className={`${styles.LeftPane_iconbutton}`}>
          <IconButton
            onClick={onClose}
            sx={{
              "&:hover": {
                backgroundColor:
                  props.theme === "dark"
                    ? "rgba(165,209, 73, 0.5)"
                    : "rgba(33,88, 164, 0.2)",
              },
            }}
          >
            {props.language === "en" ? (
              <ArrowCircleLeftRoundedIcon
                className={`${styles.Leftpane_ArrowCircleRoundedIcon} ${props.theme === "default"
                  ? defaultthemestyles.default_drawer_arrowcolor
                  : props.theme === "light"
                    ? lightthemestyles.light_iconcolor
                    : darkthemestyles.dark_drawer_arrowcolor
                  }`}
                sx={{
                  fontSize: "2rem",
                }}
              />
            ) : (
              <ArrowCircleRightRoundedIcon
                className={`${styles.Leftpane_ArrowCircleRoundedIcon} ${props.theme === "default"
                  ? defaultthemestyles.default_drawer_arrowcolor
                  : props.theme === "light"
                    ? lightthemestyles.light_iconcolor
                    : darkthemestyles.dark_drawer_arrowcolor
                  }`}
                sx={{
                  fontSize: "2rem",
                }}
              />
            )}
          </IconButton>
        </div>
      </div>
      <div style={{ height: "86%" }}>
        {children.slice(1)}
        <div
          style={{
            position: "absolute",
            top: "50%",
            [props.language === "ar" ? "right" : "left"]: 0,
            rotate:props.language==="ar"?"180deg":"360deg",
         
            transform: props.language === "ar" ? "translate(-35%, -1%)" : "translate(-40%, -50%)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}

        >
          <ArrowCircleRightRoundedIcon
            className={`${styles.Leftpane_ArrowCircleRoundedIconkkkkkk} ${props.theme === "default"
              ? defaultthemestyles.default_drawer_arrowcolor
              : props.theme === "light"
                ? lightthemestyles.light_iconcolor
                : darkthemestyles.dark_drawer_arrowcolor
              }`}


            fontSize="large"
          />
          <div className={isSidebarVisible ? styles.visibleSidebar : styles.hiddenSidebar}>
            <Sidebar lang={props.language} changePageTitle={changePageTitle} state={drawer} toggleDrawer={toggleDrawer} />
          </div>
        </div>
      </div>
    </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftPane);
