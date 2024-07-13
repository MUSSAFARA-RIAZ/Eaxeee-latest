import React from 'react'
import { Box } from '@mui/material'
import styles from "./Home.module.css"
import { connect } from "react-redux";
import DefaultLogo from "../../Assets/Images/RoyalBlue&CharcoalGrayText.png"
import DarkLogo from "../../Assets/Images/Green&PaleGrayText.png"
// import LightLogo from "../../Assets/Images/RoyalBlue&PaleGrayText.png"
function Home(props) {
  const { theme } = props;
  const logoSrc = theme === 'default' ? DefaultLogo : DarkLogo;
    return (
        <Box className={styles.main} >
                <Box
                  component="img"
                  className={styles.logo}
                  alt="Eaxee logo."
                  src={logoSrc}
                />
        </Box>
    )
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);