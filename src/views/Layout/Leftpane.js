import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { connect } from "react-redux";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import styles from "../Layout/Leftpane.module.css";
import lightthemestyles from "../../Themes/light_theme.module.css";
import darkthemestyles from "../../Themes/dark_theme.module.css";
import defaultthemestyles from "../../Themes/default_theme.module.css";

const drawerWidth = 310;

const LeftPane = ({ props, open, onClose, children }) => {

  console.log("LeftPane", props);

  return (
    <Drawer
      transitionDuration={{ enter: 500, exit: 500 }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          marginTop: "50px",
          border: "none",

          backgroundColor:
            props.theme === "default"
              ? "#cceaed "
              : props.theme === "light"
                ? "#eff3f7"
                : "#212121",
        },
      }}
      variant="persistent"
      anchor={props.language === "ar" ? "right" : "left"}
      open={open}
    >
 
      <div className={`${styles.Leftpane_iconbutton}  ${props.theme === "default"
          ? defaultthemestyles.default_iconcolor
          : props.theme === "light"
            ? lightthemestyles.light_iconcolor
            : darkthemestyles.dark_iconcolor
        }`}>
        <IconButton

          onClick={onClose}
        >

          {props.language === "en" ? (
            <ArrowCircleLeftRoundedIcon

              className={`${styles.Leftpane_ArrowCircleRoundedIcon} ${props.theme === "default"
                  ? defaultthemestyles.default_iconcolor
                  : props.theme === "light"
                    ? lightthemestyles.light_iconcolor
                    : darkthemestyles.dark_iconcolor
                }`}
              sx={{
                fontSize: "2rem"
              }}
            />
          ) : (
            <ArrowCircleRightRoundedIcon
              className={`${styles.Leftpane_ArrowCircleRoundedIcon} ${props.theme === "default"
                  ? defaultthemestyles.default_iconcolor
                  : props.theme === "light"
                    ? lightthemestyles.light_iconcolor
                    : darkthemestyles.dark_iconcolor
                }`}
              sx={{
                fontSize: "2rem"
              }}
            />
          )}
        </IconButton>
      </div>
      <div style={{  height:"86%" }}>
      {children}

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
