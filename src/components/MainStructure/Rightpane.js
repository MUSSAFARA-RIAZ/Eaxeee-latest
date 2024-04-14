import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { connect } from "react-redux";

const RightPane = ({ open, handleDrawerOpen, props, children }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "45px",
          alignItems: "center",
          // border: "3px solid yellow",

          // backgroundColor:
          //   props.theme === "default"
          //     ? "#dff7fa"
          //     : props.theme === "light"
          //     ? "#ffffff"
          //     : "#2b2b2b",
          backgroundColor:
            props.theme === "default"
              ? "#cceaed "
              : props.theme === "light"
              ? "#eff3f7"
              : "#212121",
        }}
      >
        <div
          style={{
            ...(open && { display: "none" }),

            width: "max-content",
            paddingRight: 10,

            // border: "2px solid red",
          }}
        >
          <IconButton
            // color="red"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            {props.language === "en" ? (
              <ArrowCircleRightRoundedIcon
                sx={{
                  color:
                    props.theme === "default"
                      ? "#0d7e8a"
                      : props.theme === "light"
                      ? "black"
                      : "#b4b4b4",
                  // color: "red",
                  fontSize: "2rem",
                  position: "fixed",
                  // opacity: open ? 0 : 1,
                  // transition: "all 2s ease",
                  transition:"none",

                  // transition: "all .5s ease-out" ,

                  left: 10,
                }}
              />
            ) : (
              <ArrowCircleLeftRoundedIcon
                sx={{
                  color:
                    props.theme === "default"
                      ? "#0d7e8a"
                      : props.theme === "light"
                      ? "black"
                      : "#b4b4b4",
                  fontSize: "2rem",
                  position: "fixed",
                  transition:"none",


                  right: 10,
                }}
              />
            )}
          </IconButton>
        </div>
      </div>

      <div
        style={{
          height: `calc(100vh - 96px)`,
          overflowY: "auto",

          // borderRadius:"100px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor:
            props.theme === "default"
              ? "#cceaed "
              : props.theme === "light"
              ? "#eff3f7"
              : "#212121",

          borderRadius: "20px",
          //  boxShadow: "0px 0px 10px 0px #dff7fa",
          // border: "3px solid black",

          // backgroundColor:"red",

          backgroundColor:
            props.theme === "default"
              ? "#dff7fa"
              : props.theme === "light"
              ? "#ffffff"
              : "#2b2b2b",
        }}
      >
        {children}
      </div>
    </>
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
