import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';

function CustomTabs({ value, onChange, tabs, language, theme , onClick,bgcolor}) {
  console.log("themeeeeee", theme)


  return (
    <Tabs
      value={value}
      onChange={onChange}
      onClick={onClick}
      aria-label="Custom Tabs"
      orientation="horizontal"
      
      sx={{
       
        direction: "ltr",
        backgroundColor:bgcolor,

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
            
            
            color: theme === "default" ? "#0d7e8a" : theme === "dark" ? "white" : "",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
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
