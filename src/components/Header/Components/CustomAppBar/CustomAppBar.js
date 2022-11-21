import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from "../../../../Assets/Images/no_bg_logo.png"
import arabicLogo from "../../../../Assets/Images/arabic.png"
import userImg from "../../../../Assets/Images/user.png"
import logOutImg from "../../../../Assets/Images/log-out.png"
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './CustomAppBar.module.css'
import "./Dropdown.css"


function CustomAppBar(props) {
  let { setLanguage, language, theme } = props

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const appTheme = useTheme();

  let menuRef = useRef();
  let menuParentRef = useRef();



  useEffect(() => {
    let handler = (e) => {
      if (menuParentRef.current.contains(e.target)) {
        return
      } else if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }

    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });



  function DropdownItem(props) {
    return (
      <li className={language === 'en' ? 'dropdownItem' : 'dropdownItemar'} onClick={props.gotoPage}>
        <img src={props.img} alt=""></img>
        <div> {props.text} </div>
      </li>
    );
  }

  let gotoPage = (route, title) => {
    props.changepage(title)
    navigate(route)
  }

  return (
    <Box>
      <AppBar position="static" className={styles.appBar} >

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

          <Box className={styles.logoParent}>
            <Link to="/" className={styles.logoLink}>
              <Tooltip title="Home" placement="right" className={styles.logoToolTip}>

                <Box
                  component="img"
                  className={styles.logo}
                  alt="Eaxee logo."
                  src={Logo}
                  onClick={() => props.changepage("Home")}
                />
              </Tooltip>
            </Link>
          </Box>

          <Box className={styles.pageTitle}>
            <Typography
              sx={{
                color: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff "),
              }}
              className={styles.pageTitleText}
            >
              {props.text}
            </Typography>
          </Box>

          <Button className={styles.languageToggleButton}>
            <Box
              className={styles.languageToggleButtonChild}
              component="img"
              alt="Change Language"
              src={arabicLogo}
            // onClick={() => testFunc()}
            >
            </Box>
          </Button >

          <div className={language === 'en' ? styles.faHomeEn : 'faHomeAr'}>
            <FontAwesomeIcon icon={faHome} style={{ color: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff ") }} cursor="pointer" />
          </div>

          <div ref={menuParentRef} className={language === 'en' ? ` ${styles.userMenuEn} 'menu-trigger' ` : 'userMenuAr'} onClick={() => setOpen(!open)}>
            <Typography
              sx={{
                color: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff "),
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
              }}
              className={styles.userMenuTextEn}
            >
              {language === 'en' ? "MIM Admin " : 'المشرف MIM'}
            </Typography>

            <FontAwesomeIcon icon={faCaretDown} style={{ color: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff ") }}  ></FontAwesomeIcon>
          </div>



          <div className={`'menu-container'`} ref={menuRef}>
            <div className={language === 'en' ? `dropdown-menu ${styles.userMenuList} ${open ? 'active' : 'inactive'}` : `dropdown-menuar ${open ? 'active' : 'inactive'}`}>

              <h3>{language === 'en' ? 'MIM Admin' : 'المشرف MIM'}<br />
                <span>info@mim.gov.sa</span>
                {/* <span>{language === 'en' ? 'info@mim.gov.sa' : 'البريد الإلكتروني'}</span> */}
              </h3>

              <DropdownItem img={userImg} text={language === 'en' ? "My Profile" : 'مظهر جانبي'} gotoPage={() => gotoPage("Profile", "Profile")} ></DropdownItem>
              <DropdownItem img={logOutImg} text={language === 'en' ? "Logout" : 'تسجيل خروج'} gotoPage={() => gotoPage("/", "Home")} ></DropdownItem>

              {/* <DropdownItem img={userImg} text={language === 'en' ? "My Profile" : 'مظهر جانبي'} onClick={() => props.changepage("Profile")} /> */}
              {/* <ul>
                  <li>
                  </li>
                  <li onClick={handleClickOpenDialog}>
                    <DropdownItem img={logoutt} text={language === 'en' ? "Logout" : 'تسجيل خروج'}></DropdownItem>
                  </li>
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to logout?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleCloseDialog}>Disagree</Button>
                      <Button onClick={handleCloseDialog} autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>


                </ul> */}
            </div>
          </div>



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
