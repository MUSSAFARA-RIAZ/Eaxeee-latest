import React from "react";
import { Tab, Tabs } from "@mui/material";
import { connect } from "react-redux";

function CustomTabs({
  value,
  onChange,
  tabs,
  orientation,
  language,
  theme,
  onClick,
  textcolor,
  headertabindicator,
  noindicator
}) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      onClick={onClick}
      aria-label="Custom Tabs"
      orientation={orientation}
      indicatorColor="primary"
      TabIndicatorProps={{
        style: {
          // Conditionally set the background color based on the orientation and headertabindicator prop
          backgroundColor:
            noindicator === true
              ? "transparent"
              : headertabindicator
              ? theme === "default"
                ? "#cecece"
                : "#a5d149"
              : theme === "default"
              ? "#2158a4"
              : "#a5d149",
        },
      }}
      sx={{
        direction: "ltr",
      }}
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          icon={tab.icon}
          iconPosition="bottom"
          sx={{
            minHeight: "0px",
            minWidth: "0px",
            color: textcolor,
            maxWidth:"initial",
            "&:hover": {
              backgroundColor:
                theme === "dark"
                  ? "rgba(165,209, 73, 0.5)"
                  : "rgba(33,88, 164, 0.2)",
            },
            "&.Mui-selected": {
              color:
                headertabindicator === true
                  ? theme === "default"
                    ? "#cecece"
                    : "#a5d149"
                  : theme === "default"
                  ? "#2158a4"
                  : "#a5d149", // Adjust the selected text color based on the theme
            },
          }}
        />
      ))}
    </Tabs>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabs);
