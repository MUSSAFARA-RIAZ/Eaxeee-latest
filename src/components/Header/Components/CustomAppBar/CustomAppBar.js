import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from "../../../../Assets/Images/no_bg_logo.png"
// import arabic from "../images/arabic.png"
import { Link } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import '../muicomponents/styles/appbar.css'

import styles from './CustomAppBar.module.css'

import { useEffect, useRef } from 'react';

function CustomAppBar(props) {

  let { setLanguage, language, theme } = props
  const appTheme = useTheme();

  const [open, setOpen] = React.useState(false);

  let menuRef = useRef();


  return (
    <Box>
      <AppBar position="static" >

        <Toolbar
          sx={{ background: (theme === "default" ? `${appTheme.pallete.primary.main}` : theme === 'light' ? '#dee1e6' : "#063f45") }}
          className={styles.toolbar}
        >

          <Button onClick={props.toggleDrawer('left', true)} >
            <MenuIcon
              style={{
                fill: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff "),
              }}
              className={styles.menuIcon}
            />
          </Button>


          {/* <Link to="/">
            <Tooltip title="Home" placement="right"  sx={{ border: '2px solid blue', height:'' }}>

              <Box
                component="img"
                className={styles.logo}
                // sx={{ height: 30, marginBottom: "2px", }}
                alt="Eaxee logo."
                src={Logo}
                onClick={() => props.changepage("Home")}
              />
            </Tooltip>
          </Link> */}

          {/* <Box className={styles.logoParent}>
            <Link to="/">
              <Tooltip title="Home" placement="right" sx={{ border: '2px solid blue' }} className={styles.logoToolTip}>

                <Box
                  component="img"
                  className={styles.logo}
                  // sx={{ height: 30, marginBottom: "2px", }}
                  alt="Eaxee logo."
                  src={Logo}
                  onClick={() => props.changepage("Home")}
                />
              </Tooltip>
            </Link>
          </Box> */}

          {/* <Box sx={{ flexGrow: 1, marginLeft: "10px", marginTop: "8px" }}>
            <Typography
              sx={{
                fontSize: "19px",
                fontWeight: 480,
                // color: "#dff7fa",
                marginBottom: "2px",
                color: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff "),
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                // marginBottom: "8px"
              }}>
              {props.text}
            </Typography>
          </Box> */}

          {/* <Button >
            <Box
              component="img"
              sx={{

                height: 23,
                marginLeft: 2,

              }}
              alt="Change Language"
              src={arabic}
              onClick={() => testFunc()}
            />
          </Button > */}

          {/* <div className={language === 'en' ? "faHome" : 'faHomear'}>
            <FontAwesomeIcon icon={faHome} style={{ color: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff ") }} cursor="pointer" />
          </div> */}

          {/* <div className='menu-trigger' onClick={() => setOpen(!open)}>
            <div className={language === 'en' ? 'menu-title-mim' : 'menu-title-mimar'}>
              <Typography
                sx={{
                  color: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff "),
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                }}>
                {language === 'en' ? "MIM Admin " : 'المشرف MIM'}
              </Typography>

            </div>

            <FontAwesomeIcon icon={faCaretDown} style={{ color: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff ") }}></FontAwesomeIcon>
          </div> */}


        </Toolbar>
      </AppBar>
    </Box>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar)
