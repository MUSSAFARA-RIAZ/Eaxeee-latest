import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { connect } from "react-redux";
import styles from "../Layout/Rightpane.module.css";
import lightthemestyles from "../../Themes/light_theme.module.css";
import darkthemestyles from "../../Themes/dark_theme.module.css";
import defaultthemestyles from "../../Themes/default_theme.module.css";
import { useLocation } from "react-router-dom";
const drawerWidth = 380;
const RightPane = ({ open, handleDrawerOpen, props, children }) => {
  const isLanguageRTL = props.language === "ar";
  const mainWidth = open ? `calc(100% - ${drawerWidth}px)` : "100%";
  const [showIcon, setShowIcon] = useState(false);
  useEffect(() => {
    let timer;
    if (!open) {
      timer = setTimeout(() => {
        setShowIcon(true);
      }, 500);
    } else {
      setShowIcon(false);
    }
    return () => clearTimeout(timer);
  }, [open]);
  const location = useLocation();
  return (
    <div
      className={`${
        props.theme === "default"
          ? defaultthemestyles.default_bgcolor
          : props.theme === "light"
          ? lightthemestyles.light_bgcolor
          : darkthemestyles.dark_bgcolor
      }`}
      style={{
        width: mainWidth,
        marginLeft: isLanguageRTL ? "auto" : open ? `${drawerWidth}px` : 0,
        marginRight: isLanguageRTL ? (open ? `${drawerWidth}px` : 0) : "auto",
        direction: isLanguageRTL ? "rtl" : "ltr",
        overflowX: open ? "hidden" : "auto",
        transition: !open ? "all .5s ease-out" : "all .5s ease-in",
      }}
    >
      <div
        className={`${styles.rightpane_firstcontainer} ${
          props.theme === "default"
            ? defaultthemestyles.default_bgcolor
            : props.theme === "light"
            ? lightthemestyles.light_bgcolor
            : darkthemestyles.dark_bgcolor
        }`}
      >
        <div style={{ display: "flex", width:'100%' }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            {props.language === "en" ? (
              showIcon && (
                <ArrowCircleRightRoundedIcon
                  className={`${styles.rightpane_rightRoundediconenglish} ${
                    props.theme === "default"
                      ? defaultthemestyles.default_drawer_arrowcolor
                      : props.theme === "light"
                      ? lightthemestyles.light_iconcolor
                      : darkthemestyles.dark_drawer_arrowcolor
                  }`}
                  sx={{
                    fontSize: "2rem",
                    "&:hover": {
                      backgroundColor:
                        props.theme === "dark"
                          ? "rgba(165,209, 73, 0.5)"
                          : "rgba(33,88, 164, 0.2)",
                    },
                  }}
                />
              )
            ) : (
              <ArrowCircleLeftRoundedIcon
                className={`${styles.rightpane_rightRoundediconarabic} ${
                  props.theme === "default"
                    ? defaultthemestyles.default_drawer_arrowcolor
                    : props.theme === "light"
                    ? lightthemestyles.light_iconcolor
                    : darkthemestyles.dark_drawer_arrowcolor
                }`}
                sx={{
                  fontSize: "2rem",
                  display: open && drawerWidth !== 0 ? "none" : "block",
                }}
              />
            )}
          </IconButton>
          {location.pathname === "/admin" ? null : children[0]}
          <div style={{ position: "relative", left: "30px" }}>
            {location.pathname === "/admin" ? children[0] : null}
          </div>
        </div>
      </div>

      <div
      // style={{border:"2px solid red"}}
        className={`${styles.rightpane_secondcontainer}  ${
          props.theme === "default"
            ? defaultthemestyles.default_bordercolor
            : props.theme === "light"
            ? lightthemestyles.light_bordercolor
            : darkthemestyles.dark_bordercolor
        } ${
          props.theme === "default"
            ? defaultthemestyles.default_secondcontainer
            : props.theme === "light"
            ? lightthemestyles.light_secondcontainer
            : darkthemestyles.dark_secondcontainer
        } `}
      >
        {children.slice(1)}
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RightPane);
