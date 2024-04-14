import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
import CustomButton from '../../../CustomButton/CustomButton';
import Button from '@mui/material/Button';
import styles from './CustomAppBar.module.css'
import "./Dropdown.css"
import GreenXlogo from "../../../../Assets/Images/MainLogo.png"
import BlackXlogo from "../../../../Assets/Images/eaxeeXblack.svg"
import WhiteXLogo from "../../../../Assets/Images/eaxeeXwhite.svg"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


function CustomAppBar(props) {
  console.log("CustomAppBar Props", props);
  let { setLanguage, language, theme } = props
  const navigate = useNavigate();
  const appTheme = useTheme();

  let menuRef = useRef();
  let menuParentRef = useRef();
  const [open, setOpen] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    console.log("hussain");
    setOpenDialog(false);
  };
  const handleCloseDialogWhenClickOutside = () => {
    console.log("handleCloseDialogOnOutsideClick");
    setOpenDialog(false);
  };


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
      <li className={language === 'en' ? 'dropdownItem' : 'dropdownItemar'} onClick={props.onClick}>
        <img src={props.img} alt=""></img>
        <div> {props.text} </div>
      </li>
    );
  }

  let changeLanguageAndView = () => {
    setLanguage(language)
  }

  let gotoPage = (route, title) => {
    title = (title == "Profile") ? "الملف الشخصي" :
      (title == "Home") ? "مسكن" : ""
    props.changepage(title)
    navigate(route)
  }


  return (
    <Box>
      <AppBar position="static" className={styles.appBar}  >

        <Toolbar


        // this oen is for header 
          sx={{ background: (theme === "default" ? "#0d7e8a" : theme === 'light' ? '#cbd0d7' : "#181818") }}
       
          className={styles.toolbar}
        >
          {/* MenuIcon Button start */}

          <CustomButton
          startIcon={ <MenuIcon
            style={{
              fill: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff "),
            }}
            className={styles.menuIcon}
          />}
         
          onClick={props.toggleDrawer('left', true)}>
            
          </CustomButton>

          {/* MenuIcon Button end */}


          {/* Eaxee logo start */}
          <Box className={styles.logoParent}>
            <Link to="/" className={styles.logoLink}>
              <Tooltip title="Home" placement="right" className={styles.logoToolTip}>
                <Box
                  component="img"
                  className={styles.logo}
                  alt="Eaxee logo."
                  src={theme === "default" ? GreenXlogo : theme === 'light' ? BlackXlogo : WhiteXLogo}
                                    
                  
                  onClick={() => props.changepage("Home")}
                />
              </Tooltip>
            </Link>
          </Box>
          {/* Eaxee logo end */}


          {/* Page title start */}
          <Box className={styles.pageTitle}>
            <Typography
              sx={{
                color: (theme === "default" ? `#ffff` : theme === 'light' ? '#4A4A4A  ' : "#ffff "),
              }}
              className={styles.pageTitleText}
            >
              {props.text}
            </Typography>
          </Box>
          {/* Page title start */}


          {/* Page View Switch start */}

          <Button className={styles.languageToggleButton}>
            <Box
              className={styles.languageToggleButtonChild}
              component="img"
              alt="Change Language"
              src={arabicLogo}
              onClick={changeLanguageAndView}
            >
            </Box>
          </Button >
          {/* <CustomButton
            className={styles.languageToggleButton}>
              <Box
              className={styles.languageToggleButtonChild}
              component="img"
              alt="Change Language"
              src={arabicLogo}
              onClick={changeLanguageAndView}
            >
            </Box>
            
          </CustomButton> */}

          {/* Page View Switch end */}


          {/* Testing buttons for theme */}
          <Button variant="contained" color="primary" onClick={() => props.setTheme("dark")}>dark</Button>
          <Button variant="contained" color="primary" onClick={() => props.setTheme("default")}>default</Button>
          <Button variant="contained" color="primary" onClick={() => props.setTheme("light")}>light</Button>

          {/* Testing buttons for theme */}



          {/* home icon start */}
          {/* <div className={language === 'en' ? styles.faHomeEn : styles.faHomeAr}>
            <FontAwesomeIcon icon={faHome} style={{ color: (theme === "default" ? `#ffff` : theme === 'light' ? '#6d7175' : "#ffff ") }} cursor="pointer" />
          </div> */}
          {/* home icon end */}


          {/* User dropdown Menu start */}
          <div ref={menuParentRef} className={language === 'en' ? ` ${styles.userMenuEn} 'menu-trigger' ` : `${styles.userMenuEn} 'userMenuAr' `} onClick={() => setOpen(!open)}>
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
            <div className={
              language === 'en' ?
                `dropdown-menu ${styles.userMenuListEn} ${open ? 'active' : 'inactive'}` :
                `dropdown-menuar ${styles.userMenuListAr} ${open ? 'active' : 'inactive'}`}
            >

              <h3>{language === 'en' ? 'MIM Admin' : 'المشرف MIM'}<br />
                <span>info@mim.gov.sa</span>
                {/* <span>{language === 'en' ? 'info@mim.gov.sa' : 'البريد الإلكتروني'}</span> */}
              </h3>

              <DropdownItem img={userImg} text={language === 'en' ? "My Profile" : 'مظهر جانبي'} onClick={() => gotoPage("Profile", "Profile")} ></DropdownItem>
              <DropdownItem img={logOutImg} text={language === 'en' ? "Logout" : 'تسجيل خروج'} onClick={() => setOpenDialog(true)} ></DropdownItem>

            </div>
          </div>

          {/* User dropdown Menu end */}
        </Toolbar>
      </AppBar>

      {/* Dialog Starts */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialogWhenClickOutside}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {language === 'en' ? 'Are you sure you want to logout?' : 'هل أنت متأكد أنك تريد تسجيل الخروج؟'}
        </DialogTitle>
        <DialogActions>
          <CustomButton
            
            title={language === 'en' ? 'Disagree' : 'تعارض '}
            onClick={handleCloseDialog}
            loading={false}
            disabled={false}
            fullWidth={true}
            loaderSize={25}
            loaderColor="success"
            loaderThickness={5}
          />
          <CustomButton
            autoFocus
            title={language === 'en' ? 'Agree' : 'يوافق على '}
            onClick={handleCloseDialog}
            loading={false}
            disabled={false}
            fullWidth={true}
            loaderSize={25}
            loaderColor="success"
            loaderThickness={5}
          />

        </DialogActions>
      </Dialog>
      {/* Dialog Ends */}


    </Box >
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
    },
    setTheme: (theme) => {
      return dispatch({
        type: "UPDATETHEME",
        value: theme,
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar)
