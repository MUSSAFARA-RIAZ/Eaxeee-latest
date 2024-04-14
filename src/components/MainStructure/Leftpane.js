import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { connect } from "react-redux";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

const drawerWidth = 310;

const LeftPane = ({ props, open, onClose }) => {
  console.log("LeftPane", props);

  return (
    <Drawer
      transitionDuration={{ enter: 500, exit: 500 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: drawerWidth,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          marginTop: "50px",
          border: "none",
          height: "92vh",
          // border: "3px solid pink",

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
      <div style={{ alignSelf: "flex-end", paddingRight: "10px" }}>
        <IconButton
          sx={{
            color:
              props.theme === "default"
                ? "#0d7e8a"
                : props.theme === "light"
                ? "black"
                : "#b4b4b4",
          }}
          onClick={onClose}
        >
          {props.language === "en" ? (
            <ArrowCircleLeftRoundedIcon sx={{ fontSize: "2rem" }} />
          ) : (
            <ArrowCircleRightRoundedIcon sx={{ fontSize: "2rem" }} />
          )}
        </IconButton>
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
