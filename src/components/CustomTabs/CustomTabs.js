import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';


function CustomTabs({ value, onChange, tabs, orientation, indicatorcolor }) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      aria-label="Custom Tabs"
      orientation={orientation} 
      indicatorColor={indicatorcolor}
     
     
      
     

    > 
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab.label} icon={tab.icon} iconPosition='start'
        sx={{ minHeight:"0px"}}
       
       
        />
      ))}
    </Tabs>
  );
}

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (lang) => {
            return dispatch({
                type: "TOGGLELANG",
                value: (lang === 'en') ? 'ar' : "en"
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabs);




